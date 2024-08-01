import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { FiInstagram } from 'react-icons/fi';
import { FaSpotify } from 'react-icons/fa';

function App() {
    const [cursorShape, setCursorShape] = useState('');
    const [isBreathing, setIsBreathing] = useState(false);
    const [cursorVisible, setCursorVisible] = useState(false);
    const shapes = ['cursor-square', 'cursor-circle'];


    const handleMouseEnter = () => {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        setCursorShape(shape);
        setIsBreathing(true);
        setCursorVisible(true); // Show cursor
    };

    const handleMouseLeave = () => {
        setCursorShape('');
        setIsBreathing(false);
        setCursorVisible(false); // Hide cursor
    };

    useEffect(() => {
        const cursorElement = document.createElement('div');
        cursorElement.className = `custom-cursor ${cursorShape} ${isBreathing ? 'cursor-breathing' : ''}`;
        document.body.appendChild(cursorElement);

        const handleMouseMove = (event) => {
            cursorElement.style.left = `${event.clientX}px`;
            cursorElement.style.top = `${event.clientY}px`;
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.body.removeChild(cursorElement);
        };
    }, [cursorShape, isBreathing]);

    useEffect(() => {
        const cursorElement = document.querySelector('.custom-cursor');
        if (cursorElement) {
            if (cursorVisible) {
                cursorElement.classList.add('visible');
            } else {
                cursorElement.classList.remove('visible');
            }
        }
    }, [cursorVisible]);

    return (
        <div>
             <div className="cat-gif">
          <img src="https://i.gifer.com/origin/0c/0cc97d458e5730693270bffd0ce34f73_w200.gif" height="50px" alt="Running Cat" />
        </div>
            <header>
                <section id="home">
                    <div className="home-content-table">
                        <div className="home-content-tablecell">
                            <div className="row">
                                <div className="col-twelve">
                                    <h1 className="flick">
                                        <span
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                            aria-label="FLICK"
                                        >
                                            FLICK
                                        </span>
                                        <br />
                                    </h1>
                                    <div className="sub-head">VISUAL EFFECTS</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav className="home-social-list" aria-label="Social Media Links">
                        <ul>
                            <li>
                                <a
                                    href="https://www.instagram.com/flickvfx/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Follow us on Instagram"
                                >
                                    <FiInstagram />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://open.spotify.com/user/31lky5dbczeenbrmeq3ghvphhgke"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Listen to us on Spotify"
                                >
                                    <FaSpotify />
                                </a>
                            </li>
                        </ul>
                    </nav>
                </section>
            </header>
        </div>
    )
};

export default App;
