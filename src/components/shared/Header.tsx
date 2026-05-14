import { API_URLS } from "@/src/configs/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import type { HeaderSlideContent } from "@/src/features/slides/types/headerSlide.type";

export default function Header() {
    const [slideContents, setSlideContents] = useState<HeaderSlideContent[]>([]);

    useEffect(() => {
        axios.get(API_URLS.HEADER_SLIDE_CONTENTS)
            .then((response) => {
                setSlideContents(response.data);
            })
            .catch((error) => {
                console.error("Error fetching header slide contents:", error);
            });
    }, []);


    const currentDate = new Date();

    const filteredSlideContents = slideContents.filter((content: HeaderSlideContent) => {
        // Nếu cả 2 đều null => luôn hiển thị
        if (!content.startDate && !content.endDate) {
            return true;
        }

        const startDate = content.startDate ? new Date(content.startDate) : null;
        const endDate = content.endDate ? new Date(content.endDate) : null;

        // chỉ có startDate => hiển thị nếu currentDate >= startDate
        if (startDate && !endDate) {
            return currentDate >= startDate;
        }

        // chỉ có endDate => hiển thị nếu currentDate <= endDate
        if (!startDate && endDate) {
            return currentDate <= endDate;
        }

        // có cả startDate và endDate => hiển thị nếu currentDate nằm trong khoảng [startDate, endDate]
        if (startDate && endDate) {
            return startDate <= currentDate && endDate >= currentDate;
        }

        return false;
    });

    return (
        <Fragment>
            <header className="section-bg">
                <div className="header-top">
                    <div className="container">
                        <div className="header-top-wrapper">
                            <ul>
                                {filteredSlideContents.map((content: HeaderSlideContent) => (
                                    <li key={content.id}>{content.icon} {content.title}</li>
                                ))}
                            </ul>

                            <div className="top-right">
                                <div className="search-wrp">
                                    <button>
                                        <i className="far fa-search" />
                                    </button>
                
                                    <input placeholder="Search" aria-label="Search" />
                                </div>

                                <div className="social-icons d-flex align-items-center gap-3">
                                    <a href="#">
                                        <i className="ti ti-brand-facebook"></i>
                                    </a>
                                    <a href="#">
                                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
                                        <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12C24 5.373 18.627 0 12 0zm0 21.6c-5.302 0-9.6-4.298-9.6-9.6 0-5.302 4.298-9.6 9.6-9.6 5.302 0 9.6 4.298 9.6 9.6 0 5.302-4.298 9.6-9.6 9.6z" fill="#0068FF" />
                                        <path d="M12 5.5c-3.037 0-5.5 2.463-5.5 5.5s2.463 5.5 5.5 5.5 5.5-2.463 5.5-5.5-2.463-5.5-5.5-5.5zm0 10c-2.481 0-4.5-2.019-4.5-4.5s2.019-4.5 4.5-4.5 4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5z" fill="#0068FF" />
                                        </svg>
                                    </a>
                                    <a href="#">
                                        <i className="ti ti-brand-youtube"></i>
                                    </a>
                                    <a href="#">
                                        <i className="ti ti-brand-instagram"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
    );
}