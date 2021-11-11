import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import VanillaPreview from "@code-editor/vanilla-preview";
import "@vscode/webview-ui-toolkit";

export default function VSCodeEmbedGridaExplorerPreview() {
  const router = useRouter(); // use router only for loading initial params.
  const [preview, setPreview] = useState<MinimalPreviewProps>(undefined);
  const [loading, setLoading] = useState(false);

  const isEmpty = preview === undefined;

  useEffect(() => {
    __lifecycle_event_page_loaded();
  }, []);

  // client-to-this-page message handling
  useEffect(() => {
    // subscribes to user's message
    const listener = (e) => {
      if (e.data.__signature === __eventfromclient__signature) {
        const event = e.data as EventFromClient;
        switch (event.payload.type) {
          case "clear-preview": {
            setPreview(undefined);
            break;
          }
          case "update-preview": {
            setPreview(event.payload.preview);
            break;
          }
          case "set-loading": {
            setLoading(event.payload.isLoading);
            break;
          }
        }
      }
      //
    };

    window.addEventListener("message", listener);
    return () => {
      window.removeEventListener("message", listener);
    };
  }, []);

  if (isEmpty) {
    return <EmptyState />;
  }

  return <PreviewState {...preview} loading={loading} />;
}

function __lifecycle_event_page_loaded() {
  window.postMessage({ __signature: "event-from-host", type: "page-loaded" });
}

function EmptyState({ message = "Nothing is selected" }: { message?: string }) {
  return (
    <EmptyStateContainer>
      <NothingIsSelected>{message}</NothingIsSelected>
    </EmptyStateContainer>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "vscode-progress-ring": any;
    }
  }
}

function LoadingOverlay() {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 1,
      }}
    >
      <vscode-progress-ring></vscode-progress-ring>
    </div>
  );
}

const EmptyStateContainer = styled.div`
  /* disable text selection */
  -webkit-user-select: none;
  -webkit-user-drag: none;
  -webkit-app-region: no-drag;
  cursor: default;
  /* ---- */
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  flex: none;
  gap: 10px;
  background-color: rgba(37, 37, 38, 1);
  box-sizing: border-box;
`;

const NothingIsSelected = styled.span`
  color: rgba(212, 212, 212, 1);
  text-overflow: ellipsis;
  font-size: 11px;
  font-family: "SF Pro Text", sans-serif;
  font-weight: 700;
  text-align: center;
`;

interface MinimalPreviewProps {
  id?: string;
  srcDoc: string;
  size: {
    width: number;
    height: number;
  };
}

function PreviewState({
  id,
  srcDoc,
  size,
  loading,
}: MinimalPreviewProps & { loading: boolean }) {
  return (
    <>
      {loading && <LoadingOverlay />}
      <VanillaPreview
        type="responsive"
        id={id ?? "no-id"}
        data={srcDoc}
        margin={0}
        borderRadius={0}
        origin_size={size}
      />
    </>
  );
}

const __eventfromclient__signature = "event-from-client";
interface EventFromClient<T extends Commands = Commands> {
  __signature: typeof __eventfromclient__signature;
  payload: T;
}

type Commands = UpdatePreviewCommand | ClearPreviewCommand | SetLoadingCommand;

interface UpdatePreviewCommand {
  type: "update-preview";
  preview: MinimalPreviewProps;
}

interface ClearPreviewCommand {
  type: "clear-preview";
}

interface SetLoadingCommand {
  type: "set-loading";
  isLoading: boolean;
}

///
/// development clips
/// on chrome debug console, paste this to trigger the command event.
/// ```
/// window.postMessage({
///   __signature: "event-from-client",
///   payload: {
///     type: "update-preview",
///     preview: { srcDoc: "your-html-content-here", size: { width: 375, height: 812 } },
///   }
/// }, "*")
/// ```
///
