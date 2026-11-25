import Berths from "./Berths";
import ImageBand from "./ImageBand";
import Service from "./Service";
import Steps from "./Steps";
import Reviews from "./Reviews";
import Faq from "./Faq";
import Request from "./Request";

/** Lower half of the Home page: Berths → Image band → Service → Steps → Reviews → FAQ → Request. */
export default function Lower() {
  return (
    <>
      <Berths />
      <ImageBand />
      <Service />
      <Steps />
      <Reviews />
      <Faq />
      <Request />
    </>
  );
}
