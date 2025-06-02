interface NavigationItem {
    name: string;
    href: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
}
interface SidebarProps {
    navigation: NavigationItem[];
    activeView: string;
    onNavigate: (view: string) => void;
    open: boolean;
    onClose: () => void;
}
export declare function Sidebar({ navigation, activeView, onNavigate, open, onClose }: SidebarProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Sidebar.d.ts.map