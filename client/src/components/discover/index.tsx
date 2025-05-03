import { LayoutContent, TabsContent } from "@cartridge/ui-next";
import { useCallback, useMemo } from "react";
import { useArcade } from "@/hooks/arcade";
import { EditionModel } from "@bal7hazar/arcade-sdk";
import { useAchievements } from "@/hooks/achievements";
import {
  Connect,
  DiscoverEmpty,
  DiscoverError,
  DiscoverLoading,
} from "../errors";
import { addAddressPadding, getChecksumAddress } from "starknet";
import { ArcadeDiscoveryGroup } from "../modules/discovery-group";
import { useNavigate, useSearchParams } from "react-router-dom";
import ArcadeSubTabs, { SubTabValue } from "../modules/sub-tabs";
import { useAccount } from "@starknet-react/core";
import { useActivities } from "@/hooks/activities";
import { UserAvatar } from "../user/avatar";

export function Discover({ edition }: { edition?: EditionModel }) {
  const [searchParams] = useSearchParams();
  const { isConnected, address } = useAccount();
  const {
    aggregatedActivities,
    usernames: activitiesUsernames,
    status: activitiesStatus,
  } = useActivities();
  const {
    events,
    usernames: achievementsUsernames,
    isLoading,
    isError,
  } = useAchievements();
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
    (gameId: number, editionId: number) => {
      const url = new URL(window.location.href);
      url.searchParams.set("game", gameId.toString());
      url.searchParams.set("edition", editionId.toString());
      navigate(url.toString().replace(window.location.origin, ""));
    },
    [navigate],
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

  const editionEvents = useMemo(() => {
    const data = filteredEditions
      .flatMap((edition) => {
        const achievements =
          events[edition?.config.project]?.map((event) => {
            const username =
              achievementsUsernames[addAddressPadding(event.player)];
            return {
              name: username,
              address: getChecksumAddress(event.player),
              Icon: <UserAvatar username={username} size="sm" />,
              data: {
                title: event.achievement.title,
                label: "earned",
                icon: event.achievement.icon,
              },
              timestamp: event.timestamp,
              logo: edition.properties.icon,
              color: edition.color,
              points: event.achievement.points,
              onClick: () => handleClick(edition.gameId, edition.id),
            };
          }) || [];
        const activities =
          aggregatedActivities[edition?.config.project]?.map((activity) => {
            const username =
              activitiesUsernames[addAddressPadding(activity.callerAddress)];
            const count = activity.count;
            return {
              name: username,
              address: getChecksumAddress(activity.callerAddress),
              Icon: <UserAvatar username={username} size="sm" />,
              data: {
                title: count > 1 ? `${count} Actions` : activity.entrypoint,
                label: "performed",
                icon: "fa-wave-pulse",
              },
              timestamp: Math.floor(activity.timestamp / 1000),
              logo: edition.properties.icon,
              color: edition.color,
              onClick: () => handleClick(edition.gameId, edition.id),
            };
          }) || [];
        return [...achievements, ...activities];
      })
      .sort((a, b) => b.timestamp - a.timestamp);
    if (!data) return { all: [], following: [] };
    return {
      all: data.slice(0, 100),
      following: data
        .filter((event) => following.includes(event.address))
        .slice(0, 100),
    };
  }, [
    events,
    aggregatedActivities,
    filteredEditions,
    achievementsUsernames,
    activitiesUsernames,
    following,
    handleClick,
  ]);

  if (isError || activitiesStatus === "error") return <DiscoverError />;

  if (isLoading && activitiesStatus === "loading") return <DiscoverLoading />;

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
            className="flex justify-center gap-8 w-full h-full overflow-y-scroll"
            style={{ scrollbarWidth: "none" }}
          >
            <TabsContent className="p-0 mt-0 grow w-full" value="all">
              {editionEvents.all.length === 0 ? (
                <DiscoverEmpty />
              ) : (
                <div className="pb-6">
                  <ArcadeDiscoveryGroup events={editionEvents.all} rounded />
                </div>
              )}
            </TabsContent>
            <TabsContent className="pb-0 mt-0 grow w-full" value="following">
              {!isConnected ? (
                <Connect />
              ) : following.length === 0 ||
                editionEvents.following.length === 0 ? (
                <DiscoverEmpty />
              ) : (
                <div className="pb-6">
                  <ArcadeDiscoveryGroup
                    events={editionEvents.following}
                    rounded
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
