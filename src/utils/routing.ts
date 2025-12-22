import region from "../routes/region/region";
import waitingroom from "../routes/waitingroom/waitingroom";
import lightswitch from "../routes/lightswitch/lightswitch";
import socialbans from "../routes/socialbans/socialbans";
import version from "../routes/version/version";
import timeline from "../routes/timeline/timeline";
import datarouter from "../routes/datarouter/datarouter";

export default function () {
    region();
    waitingroom();
    lightswitch();
    socialbans();
    version();
    timeline();
    datarouter();
}