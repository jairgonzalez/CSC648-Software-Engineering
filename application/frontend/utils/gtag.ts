export const pageview = (url: URL) => {
  // @ts-ignore
  window.gtag("config", process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
    page_path: url,
  });
};

type GEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

export const event = ({action, category, label, value}: GEvent) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
