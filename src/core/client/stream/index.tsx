import { Child as PymChild } from "pym.js";
import React from "react";
import { FunctionComponent } from "react";
import ReactDOM from "react-dom";

import { createManaged } from "talk-framework/lib/bootstrap";
import AppContainer from "talk-stream/containers/AppContainer";

import {
  OnEvents,
  OnPostMessageSetAccessToken,
  OnPymLogin,
  OnPymLogout,
  OnPymSetCommentID,
} from "./listeners";
import { initLocalState } from "./local";
import localesData from "./locales";

// Import css variables.
import "talk-ui/theme/variables.css";

const listeners = (
  <>
    <OnPymLogin />
    <OnPymLogout />
    <OnPymSetCommentID />
    <OnPostMessageSetAccessToken />
    <OnEvents />
  </>
);

async function main() {
  const ManagedTalkContextProvider = await createManaged({
    initLocalState,
    localesData,
    userLocales: navigator.languages,
    pym: new PymChild({ polling: 100 }),
  });

  const Index: FunctionComponent = () => (
    <ManagedTalkContextProvider>
      <>
        {listeners}
        <AppContainer />
      </>
    </ManagedTalkContextProvider>
  );

  ReactDOM.render(<Index />, document.getElementById("app"));
}

main();