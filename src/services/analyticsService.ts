/**
 * A simple analytics service to track user interactions.
 * In a real-world scenario, this would send data to a service like Google Analytics, Mixpanel, or a custom backend.
 */

type EventParams = Record<string, string | number | boolean>;

class AnalyticsService {
  private static instance: AnalyticsService;
  private isEnabled: boolean = true;

  private constructor() {
    // Determine if analytics should be enabled (e.g., based on environment)
    this.isEnabled = process.env.NODE_ENV !== 'test';
  }

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  /**
   * Tracks a custom event.
   * @param eventName The name of the event to track.
   * @param params Additional parameters for the event.
   */
  public trackEvent(eventName: string, params?: EventParams) {
    if (!this.isEnabled) return;

    const timestamp = new Date().toISOString();
    const eventData = {
      event: eventName,
      params,
      timestamp,
      url: window.location.href,
    };

    // For this applet, we'll log to the console.
    // In production, you'd call an API here.
    console.log(`[Analytics] ${eventName}`, eventData);
  }

  /**
   * Tracks a page view.
   */
  public trackPageView() {
    this.trackEvent('page_view', {
      path: window.location.pathname,
      title: document.title,
    });
  }
}

export const analytics = AnalyticsService.getInstance();
