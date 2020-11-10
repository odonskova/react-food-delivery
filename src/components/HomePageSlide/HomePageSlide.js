import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {EffectCube, Autoplay, Pagination} from 'swiper';

import './HomePageSlide.css';
import 'swiper/swiper-bundle.css';
import 'swiper/components/effect-fade/effect-fade.scss';

SwiperCore.use([EffectCube, Autoplay, Pagination]);

const HomePageSlide = () => (
    <section className="container-promo">
        <Swiper
            slidesPerView={1}
            autoplay={true}
            loop={true}
            effect = "cube"
            cubeEffect = {{
                slideShadows: false,
                shadow: false
            }}
            pagination={{ clickable: true }}
        >

            <SwiperSlide>
                <section className="promo pizza">
                    <h1 className="promo-title">Онлайн-сервис <br/>доставки еды на дом</h1>
                    <p className="promo-text">
                        Блюда из любимого ресторана привезет курьер в перчатках, маске и с антисептиком
                    </p>
                </section>
            </SwiperSlide>

            <SwiperSlide>
                <section className="promo kebab">
                    <h1 className="promo-title">Шашлыки на майские <br /> со скидкой 35%</h1>
                    <p className="promo-text">
                        Закажите шашлыки в любом ресторане до 10 мая и получите скидку по промокоду OMAGAD
                    </p>
                </section>
            </SwiperSlide>

            <SwiperSlide>
                <section className="promo vegetables">
                    <h1 className="promo-title">Скидка 20% на всю еду <br/> по промокоду LOVE.JS</h1>
                    <p className="promo-text">
                        Блюдо из ресторана привезут вместе с двумя подарочными книгами по фронтенду
                    </p>
                </section>
            </SwiperSlide>

            <SwiperSlide>
                <section className="promo sushi">
                    <h1 className="promo-title">Сеты со скидкой до 30% <br/> в ресторанах</h1>
                    <p className="promo-text">
                        Скидки на сеты до 30 мая по промокоду DADADA
                    </p>
                </section>
            </SwiperSlide>
        </Swiper>
    </section>
);
export default HomePageSlide