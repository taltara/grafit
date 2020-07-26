import React from 'react';

import { ReactComponent as IconTv } from '../assets/img/tv.svg';
import { ReactComponent as IconFilm } from '../assets/img/film.svg';

const Home = (props) => {

    const { theme } = props;
    console.log(theme);
    return (
        <main className={`home-main main-${theme} flex column align-end space-center`} >
            <section className="home-content flex column align-center space-center">

                <h1 className="home-header">GRAFIT.</h1>
                <p>Your go-to tool for researching and analyzing your favorite Movies & TV Shows,
                with style! </p>
                <p>Get to know the shows you grew on even better, or get a beautiful sneak
                    peek at your next binge-worthy journey! </p>
                <div className="home-images flex align-center space-between">
                    <IconTv className="type-icon" />
                    <IconFilm className="type-icon" />
                </div>
                <p>Explore the bigger picture of any movie you can think of, with a rare insight you've
                    never seen before.</p>

            </section>
        </main>
    );
};

export default Home;