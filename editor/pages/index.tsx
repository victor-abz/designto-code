import React from "react";
import { RecentDesignCardList } from "components/recent-design-card";
import { DefaultEditorWorkspaceLayout } from "layouts/default-editor-workspace-layout";
import { SideNavigation } from "components/side-navigation";

export default function Home() {
  return (
    <DefaultEditorWorkspaceLayout leftbar={<SideNavigation>{}</SideNavigation>}>
      <BodyContainer />
      {/* <Link href="/figma">from figma</Link>
      <br />
      <br />
      <Link href="/preferences">Preferences (set access token)</Link> */}
    </DefaultEditorWorkspaceLayout>
  );
}

function BodyContainer() {
  return (
    <div style={{ padding: 24 }}>
      <RecentDesignSection />
    </div>
  );
}

function RecentDesignSection() {
  return (
    <>
      <RecentDesignCardList />
    </>
  );
}
