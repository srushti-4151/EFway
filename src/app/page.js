import Image from "next/image";
import Homepage from "./Homepage/page";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./Header/page";
import Secondsection from "./secondsection/page";
import FeaturedProducts from "./FeaturedProducts/page";
import Banner from "./Banner/Banner";
import Blog from "./Blog/page";
import Footer from "./Footer/page";

export default function Home() {
  return (
    <>
        <div className="relative overflow-hidden bg-[#F2F4EC]">
          <Homepage />
          <Secondsection />
          <FeaturedProducts />
          <Banner />
          <Blog/>
          <Footer />
        </div>
    </>
  );
}
