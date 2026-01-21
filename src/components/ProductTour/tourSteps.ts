export interface TourStep {
  selector: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const tourSteps: readonly TourStep[] = [
  {
    selector: '.tour-trigger-button',
    title: 'Welcome to OmniGuide!',
    content: 'Click here anytime to restart the product tour.',
    position: 'bottom',
  },
  {
    selector: '.stat-card-0',
    title: 'Your Key Metrics',
    content: 'This card shows your active users. Keep an eye on this KPI!',
    position: 'bottom',
  },
  {
    selector: '.add-user-button',
    title: 'Add New Users',
    content: 'Click here to add new users to your organization.',
    position: 'left',
  },
  {
    selector: '.user-table-container',
    title: 'User Management',
    content: 'View and manage all your users in this table.',
    position: 'top',
  },
  {
    selector: '.featured-user-row',
    title: 'Featured User!',
    content: 'This is a VIP user that was just added to the system.',
    position: 'top',
  },
  {
    selector: '.notifications-button',
    title: 'Notifications',
    content: "Check your notifications here. You're all caught up!",
    position: 'bottom',
  },
];
