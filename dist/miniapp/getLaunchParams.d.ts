export interface LaunchParams {
    user_id: number;
    app_id: number;
    is_app_user: boolean;
    are_notifications_enabled: boolean;
    language: string;
    ref: string;
    access_token_settings: Scope[];
    group_id: number;
    viewer_group_role: ViewerGroupRole;
    platform: Platform;
    is_favorite: boolean;
    ts: number;
    sign: string;
}
export declare enum Scope {
    FRIENDS = "friends",
    PHOTOS = "photos",
    VIDEO = "video",
    STORIES = "stories",
    PAGES = "pages",
    STATUS = "status",
    NOTES = "notes",
    WALL = "wall",
    DOCS = "docs",
    GROUPS = "groups",
    STATS = "stats",
    MARKET = "market",
    APP_WIDGET = "app_widget",
    MESSAGES = "messages",
    MANAGE = "manage"
}
export declare enum ViewerGroupRole {
    ADMIN = "admin",
    EDITOR = "editor",
    MEMBER = "member",
    MODER = "moder",
    NONE = "none"
}
export declare enum Platform {
    DESKTOP_WEB = "desktop_web",
    MOBILE_ANDROID = "mobile_android",
    MOBILE_ANDROID_MESSENGER = "mobile_android_messenger",
    MOBILE_IPAD = "mobile_ipad",
    MOBILE_IPHONE = "mobile_iphone",
    MOBILE_IPHONE_MESSENGER = "mobile_iphone_messenger",
    MOBILE_WEB = "mobile_web"
}
export declare function getLaunchParams(): LaunchParams;
