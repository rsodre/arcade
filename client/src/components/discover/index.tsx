import {
  Empty,
  LayoutContent,
  Skeleton,
  TabsContent,
} from "@cartridge/ui-next";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useArcade } from "@/hooks/arcade";
import { EditionModel } from "@bal7hazar/arcade-sdk";
import { Connect } from "../errors";
import { addAddressPadding, getChecksumAddress } from "starknet";
import { ArcadeDiscoveryGroup } from "../modules/discovery-group";
import { useNavigate, useSearchParams } from "react-router-dom";
import ArcadeSubTabs, { SubTabValue } from "../modules/sub-tabs";
import { useAccount } from "@starknet-react/core";
import { UserAvatar } from "../user/avatar";
import { useDiscovers } from "@/hooks/discovers";

const DEFAULT_CAP = 30;
const ROW_HEIGHT = 44;

type Event = {
  identifier: string;
  name: string;
  address: string;
  Icon: React.ReactNode;
  duration: number;
  actions: string[];
  achievements: {
    title: string;
    icon: string;
    points: number;
  }[];
  timestamp: number;
  logo: string | undefined;
  color: string;
  onClick: () => void;
};

type Events = {
  all: Event[];
  following: Event[];
};

export function Discover({ edition }: { edition?: EditionModel }) {
  const [events, setEvents] = useState<Events>({
    all: [],
    following: [],
  });

  const [cap, setCap] = useState(DEFAULT_CAP);
  const parentRef = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const { isConnected, address } = useAccount();
  const {
    aggregates,
    usernames: activitiesUsernames,
    status: activitiesStatus,
  } = useDiscovers();
  const { editions, follows } = useArcade();

  const following = useMemo(() => {
    if (!address) return [];
    const addresses = follows[getChecksumAddress(address)] || [];
    if (addresses.length === 0) return [];
    return [...addresses, getChecksumAddress(address)];
  }, [follows, address]);

  const filteredEditions = useMemo(() => {
    return !edition ? editions : [edition];
  }, [editions, edition]);

  const navigate = useNavigate();
  const handleClick = useCallback(
    (gameId: number, editionId: number, address: string) => {
      // If there are several games displayed, then clicking a card link to the game
      const url = new URL(window.location.href);
      if (filteredEditions.length > 1) {
        url.searchParams.set("game", gameId.toString());
        url.searchParams.set("edition", editionId.toString());
        navigate(url.toString().replace(window.location.origin, ""));
        return;
      }
      // Otherwise it links to the player
      url.searchParams.set("address", address);
      url.searchParams.set("playerTab", "activity");
      navigate(url.toString().replace(window.location.origin, ""));
    },
    [navigate, filteredEditions],
  );

  const defaultValue = useMemo(() => {
    // Default tab is ignored if there is no address,
    // meanning the user is not connected and doesnt inspect another user
    return searchParams.get("subTab") || "all";
  }, [searchParams]);

  const handleTabClick = useCallback(
    (value: string) => {
      // Clicking on a tab updates the url param tab to the value of the tab
      // So the tab is persisted in the url and the user can update and share the url
      const url = new URL(window.location.href);
      url.searchParams.set("subTab", value);
      navigate(url.toString().replace(window.location.origin, ""));
    },
    [navigate],
  );

  useEffect(() => {
    // Reset the events if the edition changes, meaning the user has clicked on a new game edition
    setEvents({
      all: [],
      following: [],
    });
  }, [edition]);

  useEffect(() => {
    if (!filteredEditions) return;
    if (!Object.entries(aggregates)) return;
    if (!Object.entries(activitiesUsernames)) return;
    const data = filteredEditions
      .flatMap((edition) => {
        return (
          aggregates[edition?.config.project]
            ?.map((activity) => {
              const username =
                activitiesUsernames[addAddressPadding(activity.callerAddress)];
              if (!username) return null;
              return {
                identifier: activity.identifier,
                name: username,
                address: getChecksumAddress(activity.callerAddress),
                Icon: <UserAvatar username={username} size="sm" />,
                duration: activity.end - activity.start,
                actions: activity.actions,
                achievements: [...activity.achievements],
                timestamp: Math.floor(activity.end / 1000),
                logo: edition.properties.icon,
                color: edition.color,
                onClick: () =>
                  handleClick(
                    edition.gameId,
                    edition.id,
                    getChecksumAddress(activity.callerAddress),
                  ),
              };
            })
            .filter((item) => item !== null) || []
        );
      })
      .sort((a, b) => b.timestamp - a.timestamp);
    if (!data) return;
    const newEvents: Events = {
      all: data,
      following: data.filter((event) => following.includes(event.address)),
    };
    if (newEvents.all.length === 0) return;
    setEvents(newEvents);
  }, [
    aggregates,
    filteredEditions,
    activitiesUsernames,
    following,
    handleClick,
  ]);

  const handleScroll = useCallback(() => {
    const parent = parentRef.current;
    if (!parent) return;
    const height = parent.clientHeight;
    const newCap = Math.ceil((height + parent.scrollTop) / ROW_HEIGHT);
    if (newCap < cap) return;
    setCap(newCap + 1);
  }, [parentRef, cap, setCap]);

  useEffect(() => {
    const parent = parentRef.current;
    if (parent) {
      parent.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (parent) {
        parent.removeEventListener("scroll", handleScroll);
      }
    };
  }, [cap, defaultValue, parentRef, handleScroll]);

  useEffect(() => {
    // Reset scroll and cap on filter change
    const parent = parentRef.current;
    if (!parent) return;
    parent.scrollTop = 0;
    const height = parent.clientHeight;
    const cap = Math.ceil(height / ROW_HEIGHT);
    setCap(cap);
  }, [parentRef, edition, setCap, defaultValue]);

  return (
    <LayoutContent className="select-none h-full overflow-clip p-0">
      <div
        className="p-0 pt-3 lg:pt-6 mt-0 h-full overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        <ArcadeSubTabs
          tabs={["all", "following"]}
          defaultValue={defaultValue as SubTabValue}
          onTabClick={(tab: SubTabValue) => handleTabClick(tab)}
          className="mb-3 lg:mb-4"
        >
          <div
            ref={parentRef}
            className="flex justify-center gap-8 w-full h-full overflow-y-scroll"
            style={{ scrollbarWidth: "none" }}
          >
            <TabsContent
              className="p-0 mt-0 pb-3 lg:pb-6 grow w-full"
              value="all"
            >
              {activitiesStatus === "loading" && events.all.length === 0 ? (
                <LoadingState />
              ) : activitiesStatus === "error" || events.all.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="pb-3 lg:pb-6">
                  <ArcadeDiscoveryGroup
                    events={events.all.slice(0, cap)}
                    rounded
                    identifier={
                      filteredEditions.length === 1
                        ? filteredEditions[0].id
                        : undefined
                    }
                  />
                </div>
              )}
            </TabsContent>
            <TabsContent
              className="p-0 mt-0 pb-3 lg:pb-6 grow w-full"
              value="following"
            >
              {!isConnected ? (
                <Connect />
              ) : activitiesStatus === "error" ||
                following.length === 0 ||
                events.following.length === 0 ? (
                <EmptyState />
              ) : activitiesStatus === "loading" &&
                events.following.length === 0 ? (
                <LoadingState />
              ) : (
                <div className="pb-3 lg:pb-6">
                  <ArcadeDiscoveryGroup
                    events={events.following.slice(0, cap)}
                    rounded
                    identifier={
                      filteredEditions.length === 1
                        ? filteredEditions[0].id
                        : undefined
                    }
                  />
                </div>
              )}
            </TabsContent>
          </div>
        </ArcadeSubTabs>
      </div>
    </LayoutContent>
  );
}

const LoadingState = () => {
  return (
    <div className="flex flex-col gap-y-px overflow-hidden h-full">
      {Array.from({ length: 20 }).map((_, index) => (
        <Skeleton key={index} className="min-h-11 w-full" />
      ))}
    </div>
  );
};

const EmptyState = () => {
  return (
    <Empty title="It's feel lonely here" icon="discover" className="h-full" />
  );
};
