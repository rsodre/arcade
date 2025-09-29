# Arcade Analytics Implementation

## Overview
This document describes the analytics instrumentation implemented for the Arcade platform to track user engagement with achievements, discover feed interactions, and onboarding funnels using PostHog.

## Implementation Structure

### Core Analytics Files

1. **`client/src/hooks/useAnalytics.ts`**
   - Central analytics hook with all event definitions
   - Type-safe event properties
   - Helper functions for common tracking patterns
   - Event categories and naming conventions

2. **`client/src/hooks/usePageTracking.ts`**
   - Automatic page view tracking
   - Route-based analytics
   - Page name mapping for cleaner reporting

## Event Categories & Naming Convention

Events follow the pattern: `category_action_target`

### Categories:
- `navigation` - Navigation and routing events
- `auth` - Authentication and wallet connection
- `game` - Game selection and management
- `achievement` - Achievement interactions
- `marketplace` - Marketplace browsing
- `inventory` - Token and asset management
- `social` - Social link clicks
- `discovery` - Activity feed interactions
- `profile` - User profile views
- `onboarding` - Onboarding flow tracking

## Tracked Events

### Navigation Events
- `navigation_tab_clicked` - Main navigation tab clicks (Assets, Achievements, Activity)
- `navigation_home_clicked` - Arcade logo/home navigation
- `navigation_sidebar_toggled` - Mobile sidebar open/close

### Authentication Events
- `auth_wallet_connect_clicked` - Connect wallet button clicked
- `auth_wallet_connected` - Successful wallet connection
- `auth_wallet_disconnected` - Wallet disconnection
- `auth_user_card_clicked` - User profile card clicked

### Game Events
- `game_selected` - Game selected from sidebar
- `game_play_clicked` - Play button clicked
- `game_social_link_clicked` - Social media link clicked
- `game_register_started` - Game registration initiated
- `game_register_submitted` - Game registration completed
- `game_register_failed` - Game registration error
- `game_management_action` - Admin/owner actions
- `game_published` - Game published
- `game_hidden` - Game hidden
- `game_updated` - Game details updated

### Achievement Events
- `achievement_viewed` - Achievement viewed
- `achievement_card_clicked` - Achievement card interaction
- `achievement_pinned` - Achievement pinned
- `achievement_unpinned` - Achievement unpinned
- `achievement_shared` - Achievement shared
- `achievement_page_changed` - Achievement pagination

### Marketplace Events
- `marketplace_collection_clicked` - Collection selected
- `marketplace_item_clicked` - Item selected
- `marketplace_item_inspected` - Item details viewed
- `marketplace_purchase_initiated` - Single item purchase started
- `marketplace_purchase_completed` - Purchase completed successfully
- `marketplace_purchase_failed` - Purchase failed or cancelled
- `marketplace_bulk_purchase_initiated` - Multiple items purchase started
- `marketplace_filter_applied` - Filters applied
- `marketplace_search_performed` - Search query executed
- `marketplace_tab_switched` - Tab navigation (activity/items/holders)

### Inventory Events
- `inventory_token_clicked` - Token card clicked
- `inventory_collection_clicked` - Collection clicked
- `inventory_view_expanded` - View all tokens
- `inventory_view_collapsed` - Show less tokens

### Discovery Feed Events
- `discovery_tab_switched` - Switch between All/Following
- `discovery_event_clicked` - Activity item clicked
- `discovery_user_clicked` - User avatar/name clicked
- `discovery_feed_refreshed` - Feed refresh

### Social Events
- `social_discord_clicked` - Discord link clicked
- `social_twitter_clicked` - Twitter/X link clicked
- `social_github_clicked` - GitHub link clicked
- `social_telegram_clicked` - Telegram link clicked
- `social_website_clicked` - Website link clicked

## Event Properties

Common properties automatically added to all events:
- `timestamp` - Unix timestamp
- `page_url` - Current page URL
- `page_path` - Current page path
- `user_agent` - Browser user agent
- `screen_width` - Screen width
- `screen_height` - Screen height

### Context-Specific Properties

**Game Events:**
- `game_id` - Unique game identifier
- `game_name` - Game name
- `game_namespace` - Game namespace
- `game_world_address` - World contract address
- `is_owner` - User owns the game
- `is_admin` - User is admin
- `is_whitelisted` - Game is whitelisted
- `is_published` - Game is published

**Achievement Events:**
- `achievement_id` - Achievement identifier
- `achievement_name` - Achievement name
- `achievement_game` - Associated game
- `achievement_edition` - Edition identifier
- `achievement_page` - Current page number

**Navigation Events:**
- `from_page` - Source page/route
- `to_page` - Destination page/route
- `tab_name` - Tab identifier

**Marketplace Events:**
- `collection_address` - NFT collection contract address
- `collection_name` - Collection display name
- `item_token_id` - Specific token ID
- `item_name` - Item display name
- `item_price` - Listed price
- `seller_address` - Seller's wallet address
- `buyer_address` - Buyer's wallet address
- `order_id` - Single order identifier
- `order_ids` - Array of order identifiers (bulk purchases)
- `purchase_type` - "single" or "bulk"
- `total_price` - Total transaction amount
- `items_count` - Number of items in transaction
- `search_query` - Marketplace search term
- `marketplace_tab` - Current marketplace tab

**Token Events:**
- `token_address` - Token contract address
- `token_symbol` - Token symbol
- `token_amount` - Token amount
- `token_value` - USD value

## Usage Examples

### Basic Event Tracking
```typescript
import { useAnalytics } from "@/hooks/useAnalytics";

function MyComponent() {
  const { trackEvent, events } = useAnalytics();
  
  const handleClick = () => {
    trackEvent(events.GAME_PLAY_CLICKED, {
      game_id: "123",
      game_name: "Example Game"
    });
  };
  
  return <button onClick={handleClick}>Play Game</button>;
}
```

### Helper Functions
```typescript
const { trackGameInteraction, trackSocialClick } = useAnalytics();

// Track game interaction
trackGameInteraction("select", {
  id: "123",
  name: "Example Game",
  namespace: "example",
  worldAddress: "0x..."
});

// Track social link click
trackSocialClick("discord", "https://discord.gg/...");
```

### Page Tracking
Page tracking is automatically enabled via `usePageTracking()` hook in the main App component.

## PostHog Configuration

The PostHog provider is configured in `client/src/context/posthog.tsx` and requires the following environment variables:
- `VITE_POSTHOG_KEY` - PostHog project API key
- `VITE_POSTHOG_HOST` - PostHog host URL

## Testing Analytics

To test analytics in development:

1. Enable debug mode by setting `import.meta.env.DEV`
2. Events will be logged to console with `[Analytics]` prefix
3. Verify events in PostHog dashboard

## Future Enhancements

Potential areas for additional tracking:
- Form field interactions and validation errors
- Time spent on pages/sections
- Scroll depth tracking
- Performance metrics (load times, API latencies)
- Error tracking and recovery flows
- A/B test variant tracking
- User preferences and settings changes
- Search queries and results
- Filter combinations and usage patterns

## Maintenance

When adding new features:
1. Define new events in `useAnalytics.ts` following naming convention
2. Add event properties interface
3. Implement tracking at interaction points
4. Document new events in this file
5. Test in development environment
6. Verify in PostHog dashboard