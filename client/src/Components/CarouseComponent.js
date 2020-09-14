import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
    {
    src: 'images/h-shaw-UhOIDLhhIcI-unsplash.jpg',
    // altText: 'Slide 1',
    // caption: 'Slide 1'
    },
  {
    src: 'images/morning-brew-d-1dT0uY3CY-unsplash.jpg',
    
  },
  {
    src: 'images/evgeni-tcherkasski-0pPyrly3H2U-unsplash.jpg',
    // altText: 'Slide 2',
    // caption: 'Slide 2'
  },
  {
    src: 'images/edwin-hooper-Q8m8cLkryeo-unsplash.jpg',
    // altText: 'Slide 3',
    // caption: 'Slide 3'
  },
  // {
  //   src:'_114180574_254788c3-bee4-40d6-936d-a3388b747db7.jpg',
    
  // },
  // {
  //   src:'1667c3a2f9ac4d4abea1b1ab1ea0b35c_18.jpg',
    
  // },
  // {
  //   src:'860473-coronavirus-india-ambulance.webp',
    
  // },
  // {
  //   src:'',
    
  // },
  // {
  //   src:'',
    
  // },
  // {
  //   src:'',
    
  // },
  // {
  //   src:'',
    
  // },
  // {
  //   src:'',
    
  // },
  // {
  //   src:'',
    
  // },
];

const CarouselCompponent = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} width="100%" height="400" />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default CarouselCompponent;