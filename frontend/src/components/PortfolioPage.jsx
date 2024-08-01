import React, { useEffect, useRef, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import Plyr from 'plyr'; // Assuming you have installed plyr via npm or yarn
import 'plyr/dist/plyr.css'; // Import Plyr CSS

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const gridRef = useRef(null);
  const overlayRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const gridItems = gridRef.current.querySelectorAll('.grid-item');
    const overlay = overlayRef.current;
    const contextText = overlay.querySelector('.context-text');
    const mediaContainer = overlay.querySelector('.media-container');
    const closeOverlayButton = overlay.querySelector('.close-overlay-button');

    // Function to handle mouse over event
    const handleMouseOver = (event) => {
      const video = event.currentTarget.querySelector('video');
      if (video) {
        video.muted = true; // Ensure the video is muted
        video.play().catch((error) => {
          console.log('Video playback error:', error);
        });
      }
    };

    // Function to handle mouse out event
    const handleMouseOut = (event) => {
      const video = event.currentTarget.querySelector('video');
      if (video) {
        video.pause();
      }
    };

    const initializePlayer = (video) => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      playerRef.current = new Plyr(video, { controls: ['play', 'progress', 'volume'], autoplay: true });
    };

    gridItems.forEach((gridItem) => {
      gridItem.addEventListener('click', () => {
        const video = gridItem.querySelector('video');
        const img = gridItem.querySelector('img');

        if (video) {
          mediaContainer.innerHTML = '';
          const videoClone = video.cloneNode(true);
          videoClone.autoplay = true;
          mediaContainer.appendChild(videoClone);
          initializePlayer(videoClone);
          video.pause();
        } else if (img) {
          mediaContainer.innerHTML = '';
          mediaContainer.appendChild(img.cloneNode(true));
        }

        contextText.innerHTML = gridItem.dataset.context;
        overlay.classList.add('active');
        overlay.style.visibility = 'visible';

        closeOverlayButton.addEventListener('click', () => {
          overlay.classList.remove('active');
          if (playerRef.current) {
            playerRef.current.destroy();
          }
          overlay.style.visibility = 'hidden';
        });
      });

      // Attach preview functionality
      gridItem.addEventListener('mouseover', handleMouseOver);
      gridItem.addEventListener('mouseout', handleMouseOut);
    });

    return () => {
      gridItems.forEach(item => {
        item.removeEventListener('click', () => { });
        item.removeEventListener('mouseover', handleMouseOver);
        item.removeEventListener('mouseout', handleMouseOut);
      });
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };

  }, [activeFilter]);

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    const gridItems = gridRef.current.querySelectorAll('.grid-item');

    gridItems.forEach((item) => {
      const isItemFiltered = filter === 'all' || item.classList.contains(`${filter}-item`);
      item.style.display = isItemFiltered ? 'block' : 'none';

      if (isItemFiltered) {
        requestAnimationFrame(() => {
          item.classList.remove('hidden');
        });
      } else {
        item.classList.add('hidden');
      }
    });
  };

  return (
    <div>
      <section id="portfolio">
        <div className="intro-wrap">
          <div className="row narrow section-intro with-bottom-sep animate-this">
            <div className="col-twelve">
              <h3>My Projects</h3>
            </div>
          </div>
        </div>

        <div className="sorting-buttons">
          <button className={activeFilter === 'image' ? 'active' : ''} onClick={() => handleFilter('image')}>Images</button>
          <button className={activeFilter === 'video' ? 'active' : ''} onClick={() => handleFilter('video')}>Videos</button>
          <button className={activeFilter === 'all' ? 'active' : ''} onClick={() => handleFilter('all')}>All</button>
        </div>

        <div className="grid-container" ref={gridRef}>
          <div className={`grid-item image-item`} data-context="Astronaut">
            <img src="/img/Astronaut.png" height="300px" alt="Astronaut" />
          </div>
          <div className={`grid-item video-item`} data-context="<3">
            <video className="grid-video" poster="/poster/spidey_poster.png">
              <source src="/vid/spidey.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className={`grid-item image-item`} data-context="Cyberpunk">
            <img src="/img/Cyberpunk.png" height="300px" alt="Cyberpunk" />
          </div>
          <div className={`grid-item video-item`} data-context="Scary Night">
            <video className="grid-video" poster="/poster/scary_night_poster.png">
              <source src="/vid/scary_night.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className={`grid-item video-item`} data-context=" Date Night">
            <video className="grid-video" poster="/poster/date_night_poster.png">
              <source src="/vid/date_night.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className={`grid-item video-item`} data-context=" Cloth Simulation">
            <video className="grid-video" poster="/poster/witch_poster.png">
              <source src="/vid/witch.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <div className={`grid-item image-item`} data-context="Landscape"></div>
        </div>

        <div className="overlay" ref={overlayRef}>
          <div className="overlay-content">
            <div className="media-container"></div>
            <div className="context-text"></div>
            <button className="close-overlay-button"><IoMdClose /></button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
