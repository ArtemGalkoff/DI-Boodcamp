import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Подключаем стили

function CarouselComponent() {
  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Carousel    
        autoPlay={true}      
        infiniteLoop={true} 
        interval={3000}      
        showStatus={false}   
        useKeyboardArrows={true}
        showThumbs={true}       // Включаем отображение миниатюр (thumbs)
        thumbWidth={60}         // Ширина миниатюр
        thumbHeight={40}        // Высота миниатюр
        showArrows={true}
      >
        <div>
          <img
            src="https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/jrfyzvgzvhs1iylduuhj.jpg"
            alt="Slide 1"
            style={{ width: '80%', maxWidth: '500px', height: 'auto' }}
          />
        </div>
        <div>
          <img
            src="https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/c1cklkyp6ms02tougufx.webp"
            alt="Slide 2"
            style={{ width: '80%', maxWidth: '500px', height: 'auto' }}
          />
        </div>
        <div>
          <img
            src="https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/e8fnw35p6zgusq218foj.webp"
            alt="Slide 3"
            style={{ width: '80%', maxWidth: '500px', height: 'auto' }}
          />
        </div>
        <div>
          <img
            src="https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/liw377az16sxmp9a6ylg.webp"
            alt="Slide 4"
            style={{ width: '80%', maxWidth: '500px', height: 'auto' }}
          />
        </div>
      </Carousel>
    </div>
  );
}

export default CarouselComponent;