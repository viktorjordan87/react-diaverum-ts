import { ReactNode } from "react";
import "../main.scss";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@/components/TanStackRouterDevtools";
import { NotFound } from "@/components/Notfound";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import type { QueryClient } from "@tanstack/react-query";
import { Layout } from "antd";
import { useAtom } from "jotai";
import { siderAtom } from "@/state/layout";
const { Header, Sider, Content } = Layout;
import HeaderComponent from "@/components/Header";
import SidebarComponent from "@/components/Sidebar";

function LayoutComponent({ children }: { children: ReactNode }) {
  //sider state, visibility of the sider of the layout
  const [siderVisible] = useAtom(siderAtom);

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={siderVisible}
        width={250}
        collapsedWidth={80}
        className="bg-slate-200 dark:bg-slate-950 shadow shadow-gray-400 dark:shadow-gray-800"
      >
        <SidebarComponent />
      </Sider>
      <Layout>
        <Header className="bg-slate-100 dark:bg-slate-900 px-4">
          <HeaderComponent />
        </Header>
        <Content className="bg-slate-100 dark:bg-slate-900 px-4">
          {children}
          <Outlet />
          <TanStackRouterDevtools position="bottom-right" />
          <ReactQueryDevtools buttonPosition="bottom-left" />
        </Content>
      </Layout>
    </Layout>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: LayoutComponent,
  notFoundComponent: NotFound,
  errorComponent: (props) => {
    return (
      <LayoutComponent>
        <DefaultCatchBoundary {...props} />
      </LayoutComponent>
    );
  },
});
