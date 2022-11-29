import React from "react";
import CarouselSlider from "react-carousel-slider";
export default function App() {
  let data = [
    {
      id: "1",
      imgSrc: "https://image.made-in-china.com/2f0j00RqTzceNMhakv/Automatic-Dragon-Fruit-Juice-Paste-Processing-Line-Production-Machine.jpg"
    },
    {
      id: "2",
      imgSrc: "https://www-file.huawei.com/-/media/corp2020/images/tech4all/cases1/1/guangxi-fttr-video-cv.jpg"
    },
  ];
  let manner = {
    autoSliding: { interval: "2s" }
  };
  let buttonSetting = {
    placeOn: "bottom-beneath",
    //hoverEvent: true,
    style: {
      left: {
        margin: "0px 0px 0px 10px"
      },
      right: {
        margin: "0px 10px 0px 0px"
      }
    }
  };
  let itemsStyle = {
    margin: "0px 0px",
    padding: "0px"
  };
  return (
    <div className="CarouselSlider">
      <CarouselSlider
        slideItems={data}
        manner={manner}
        buttonSetting={buttonSetting}
        itemsStyle={itemsStyle}
      />
    </div>
  );
}
