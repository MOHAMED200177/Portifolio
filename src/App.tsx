import { useIntro } from "./intro/useIntro";
import Intro from "./intro/Intro";
import Site from "./site/Site";

export default function App() {
  const { phase, send } = useIntro();
  const live = phase === "live";
  return (
    <>
      {!live && <Intro phase={phase} send={send} />}
      <div id="site"><Site live={live} go={phase === "zooming" || live} /></div>
    </>
  );
}
