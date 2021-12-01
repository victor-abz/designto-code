import React from "react";
import styled from "@emotion/styled";
import { useComponentSize } from "react-use-size";
import {
  ResponsiveContentIframe,
  ResponsiveContentIframeProps,
} from "../responsive-content-iframe";

export const Container = styled.div<{ heightscale: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  flex: 0 1 0;
  /* FIXME: this should be a height
  // this should work, but the flex is making inner iframe height to shrink.
  height: max(${(props) => props.heightscale * 100}%, 100%);
    ref:
    - https://stackoverflow.com/questions/51288769/scaling-a-flexbox-child-with-transform-leaves-empty-space
    - https://www.reddit.com/r/css/comments/q5cvei/css_fitcontent_on_parent_wont_work_for_scaled_item/
  */
  min-height: 100%;
`;

export function ResponsiveContainer(props: ResponsiveContentIframeProps) {
  const { ref: sizingref, height, width } = useComponentSize();
  // TODO: do not remove comments here. these are required for below height calculation.
  // DON'T REMOVE
  // const [renderheightScaleFactor, setRenderheightScaleFactor] = useState(1);

  return (
    <Container
      ref={sizingref}
      heightscale={1}
      // DON'T REMOVE
      // heightscale={renderheightScaleFactor}
    >
      <ResponsiveContentIframe
        previewInfo={props}
        parentSize={{ width, height }}
        onScaleChange={() => {}}
        // DON'T REMOVE
        // onScaleChange={setRenderheightScaleFactor}
      />
    </Container>
  );
}
