"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardPage;
const react_1 = require("react");
const ChatInterface_1 = require("@/components/chat/ChatInterface");
const DocumentUpload_1 = require("@/components/documents/DocumentUpload");
const DocumentList_1 = require("@/components/documents/DocumentList");
const AnalyticsDashboard_1 = require("@/components/analytics/AnalyticsDashboard");
const SettingsPanel_1 = require("@/components/settings/SettingsPanel");
const Sidebar_1 = require("@/components/layout/Sidebar");
const Header_1 = require("@/components/layout/Header");
const outline_1 = require("@heroicons/react/24/outline");
const navigation = [
    { name: 'Chat', href: 'chat', icon: outline_1.ChatBubbleLeftRightIcon },
    { name: 'Documents', href: 'documents', icon: outline_1.DocumentTextIcon },
    { name: 'Upload', href: 'upload', icon: outline_1.CloudArrowUpIcon },
    { name: 'Analytics', href: 'analytics', icon: outline_1.ChartBarIcon },
    { name: 'Settings', href: 'settings', icon: outline_1.Cog6ToothIcon },
];
function DashboardPage() {
    const [activeView, setActiveView] = (0, react_1.useState)('chat');
    const [sidebarOpen, setSidebarOpen] = (0, react_1.useState)(false);
    const renderContent = () => {
        switch (activeView) {
            case 'chat':
                return <ChatInterface_1.ChatInterface />;
            case 'documents':
                return <DocumentList_1.DocumentList />;
            case 'upload':
                return <DocumentUpload_1.DocumentUpload />;
            case 'analytics':
                return <AnalyticsDashboard_1.AnalyticsDashboard />;
            case 'settings':
                return <SettingsPanel_1.SettingsPanel />;
            default:
                return <ChatInterface_1.ChatInterface />;
        }
    };
    return (<div className="flex h-full bg-gray-50">
      <Sidebar_1.Sidebar navigation={navigation} activeView={activeView} onNavigate={(view) => setActiveView(view)} open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header_1.Header title={navigation.find(item => item.href === activeView)?.name || 'Dashboard'} onMenuClick={() => setSidebarOpen(true)}/>
        
        <main className="flex-1 overflow-y-auto">
          <div className="h-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map