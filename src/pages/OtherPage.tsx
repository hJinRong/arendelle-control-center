/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Route } from "react-router-dom";

export default function OtherPage(params: any) {
  return (
    <Route exact sensitive strict path='/other'>
      <div>Welcome.this is the OtherPage!</div>
    </Route>
  );
}
