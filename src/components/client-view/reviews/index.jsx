"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ClientProjectView({ data }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        draggable: true, // Ensures proper mouse dragging
        swipe: true, // Ensures touch swiping
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } }
        ]
    };

    const renderStars = (rating) => {
        const totalStars = 5;
        const filledStars = Math.min(Math.max(Math.round(rating), 1), totalStars);

        return (
            <div className="flex mb-4">
                {[...Array(totalStars)].map((_, i) => (
                    <span key={i} className={`text-2xl mx-0.5 ${i < filledStars ? "text-[#FDC700]" : "text-gray-500"}`}>
                        ★
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-screen-xl sm:mt-14 sm:mb-14 px-6 sm:px-8 mb-6 mx-auto mt-24" id="reviews">
            {/* Section Header */}
            <div className="relative flex flex-col items-center justify-center min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] my-10">
                <h1 className="absolute text-[12vw] lg:text-9xl font-bold text-gray-800 opacity-20 leading-none whitespace-nowrap">
                    TESTIMONIALS
                </h1>
                <h2 className="absolute text-[5vw] sm:text-2xl md:text-4xl lg:text-5xl text-yellow-400 leading-none whitespace-nowrap">
                    TESTIMONIALS
                </h2>
                <div className="relative mt-30 sm:bottom-0 w-16 h-1 bg-gray-400 mx-auto">
                    <div className="absolute w-8 h-1 bg-amber-500"></div>
                </div>
            </div>

            {/* Carousel Slider */}
            <Slider {...settings} className="gap-x-6 mb-10">
                {data?.map((item, index) => (
                    <div key={index} className="px-4">
                        {/* Clickable Box */}
                        {item.link ? (
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                                <div className="relative bg-gray-900 shadow-lg border-2 z-0 mb-10 mt-5 border-gray-700 rounded-lg overflow-hidden p-6 min-h-[250px] max-w-screen transition-transform duration-200 hover:scale-105 cursor-pointer">
                                    {renderStars(item.rating)}
                                    <h3 className="text-lg text-white font-bold">{item.author}</h3>
                                    <p className="text-gray-400 text-sm">{item.company}</p>
                                    <div className="flex items-center mt-3">
                                        <p className="text-gray-300 text-md italic leading-relaxed line-clamp-4 flex-1">
                                            "{item.content}"
                                        </p>
                                        <span className="text-[#FDC700] text-6xl ml-2">❞</span>
                                    </div>
                                </div>
                            </a>
                        ) : (
                            <div className="relative bg-gray-900 shadow-lg border-2 z-0 mb-10 mt-5 border-gray-700 rounded-lg overflow-hidden p-6 min-h-[250px] max-w-screen transition-transform duration-200 cursor-default">
                                {renderStars(item.rating)}
                                <h3 className="text-lg text-white font-bold">{item.author}</h3>
                                <p className="text-gray-400 text-sm">{item.company}</p>
                                <div className="flex items-center mt-3">
                                    <p className="text-gray-300 text-md italic leading-relaxed line-clamp-4 flex-1">
                                        "{item.content}"
                                    </p>
                                    <span className="text-[#FDC700] text-6xl ml-2">❞</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </Slider>
        </div>
    );
}
