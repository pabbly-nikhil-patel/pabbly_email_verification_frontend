import Autoplay from 'embla-carousel-autoplay';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { List, ListItem, Typography } from '@mui/material';

import { Carousel,useCarousel , CarouselDotButtons} from 'src/components/carousel';

// import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';

export function CarouselAutoplay() {
  const autoplay = Autoplay({ delay: 3000, stopOnInteraction: false });
  const carousel = useCarousel(
    {
      loop: true,
      containScroll: false,
      slideSpacing: '20px',
    },
    [autoplay]
  );

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const services = [
    {
      title: 'Pabbly Connect',
      description: 'Automate tasks & save 100X time.',
      icon: (
        <svg
          width="36"
          height="37"
          viewBox="0 0 36 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="1" width="35" height="35" rx="17.5" fill="#DAECFF" />
          <rect x="0.5" y="1" width="35" height="35" rx="17.5" stroke="white" />
          <path
            d="M22 11.5C22 10.9494 21.5506 10.5 21 10.5C20.4494 10.5 20 10.9494 20 11.5V14.5H22V11.5ZM23.5 15.4719H12.5C12.2227 15.4719 12 15.6945 12 15.9719V16.9719C12 17.2492 12.2227 17.4719 12.5 17.4719H13V18.5C13 20.875 14.6719 22.925 17 23.4V26.5H19V23.3984C21.3281 22.925 23 20.875 23 18.5V17.4719H23.5C23.7773 17.4719 24 17.2492 24 16.9719V15.9719C24 15.7219 23.7781 15.4719 23.5 15.4719ZM16 11.5C16 10.9494 15.5506 10.5 15 10.5C14.4494 10.5 14 10.9494 14 11.5V14.5H16V11.5Z"
            fill="#1D88FA"
          />
        </svg>
      ),
    },
    {
      title: 'Pabbly Subscription Billing',
      description: 'Sell online & collect payments.',
      icon: (
        <svg
          width="36"
          height="37"
          viewBox="0 0 36 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2273_7061)">
            <path
              d="M27.6923 0.5H8.30769C3.71948 0.5 0 4.21948 0 8.80769V28.1923C0 32.7805 3.71948 36.5 8.30769 36.5H27.6923C32.2805 36.5 36 32.7805 36 28.1923V8.80769C36 4.21948 32.2805 0.5 27.6923 0.5Z"
              fill="#FFE8F1"
            />
            <path
              d="M18.0001 11C18.4918 11 18.889 11.4478 18.889 12V13.115C18.9334 13.1216 18.9751 13.1288 19.0195 13.1359C19.3139 13.1853 20.1917 13.3444 20.5528 13.4472C21.0029 13.5828 21.3167 14.1281 21.1945 14.6625C21.075 15.1969 20.5917 15.5219 20.1139 15.3875C19.8557 15.2844 19.0695 15.1656 18.7584 15.1156C17.8667 14.9656 17.1029 15.0406 16.5779 15.2656C16.0702 15.4844 15.8593 15.7937 15.8035 16.1406C15.7496 16.475 15.7904 16.6656 15.8393 16.7843C15.8919 16.9094 15.9943 17.0501 16.1985 17.2031C16.6502 17.5375 17.339 17.7625 18.2335 18.0344L18.3112 18.0594C19.1001 18.3 20.0667 18.5969 20.7833 19.1312C21.175 19.425 21.5445 19.8218 21.7722 20.3719C22.0027 20.9281 22.0528 21.5531 21.9472 22.1906C21.7528 23.4063 21.0029 24.2 20.1223 24.6125C19.7445 24.7875 19.3279 24.9 18.889 24.9562V26C18.889 26.5531 18.4918 27 18.0001 27C17.5085 27 17.1112 26.5531 17.1112 26V24.9094C17.1001 24.9094 17.0863 24.8782 17.0751 24.9031H17.0696C16.3946 24.7843 15.2799 24.4562 14.528 24.0813C14.0794 23.8562 13.8775 23.2656 14.0769 22.7594C14.2763 22.2562 14.8016 22.0281 15.2251 22.2531C15.8307 22.5438 16.7863 22.8281 17.339 22.925C18.2279 23.075 18.9584 22.9875 19.4528 22.7625C19.9223 22.5469 20.1361 22.2344 20.1973 21.8594C20.2501 21.525 20.2112 21.3344 20.1611 21.2157C20.1083 21.0906 20.0056 20.9499 19.8029 20.7969C19.3501 20.4625 18.6613 20.2375 17.7667 19.9656L17.689 19.9406C16.9001 19.7 15.9329 19.4031 15.2158 18.8688C14.8238 18.575 14.4566 18.1782 14.2285 17.6281C13.9972 17.0719 13.9469 16.4469 14.0544 15.7813C14.2511 14.5656 15.0294 13.7903 15.9435 13.3978C16.3051 13.2425 16.6974 13.1403 17.1112 13.0853V12C17.1112 11.4478 17.5085 11 18.0001 11Z"
              fill="#FF3C90"
              stroke="#FF3B90"
            />
          </g>
          <rect x="0.5" y="1" width="35" height="35" rx="17.5" stroke="white" />
          <defs>
            <clipPath id="clip0_2273_7061">
              <rect y="0.5" width="36" height="36" rx="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      title: 'Pabbly Email Marketing',
      description: 'Send emails to subscribers.',
      icon: (
        <svg
          width="36"
          height="37"
          viewBox="0 0 36 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2273_7065)">
            <path
              d="M27.6923 0.5H8.30769C3.71948 0.5 0 4.21948 0 8.80769V28.1923C0 32.7805 3.71948 36.5 8.30769 36.5H27.6923C32.2805 36.5 36 32.7805 36 28.1923V8.80769C36 4.21948 32.2805 0.5 27.6923 0.5Z"
              fill="#E9E3FF"
            />
            <path
              d="M18 22C17.4834 22 16.9669 21.8306 16.5262 21.4872L10 16.4125V23.5C10 24.3281 10.6716 25 11.5 25H24.5C25.3284 25 26 24.3284 26 23.5V16.4125L19.475 21.4906C19.0344 21.8313 18.5156 22 18 22ZM10.5091 15.5406L17.1403 20.7C17.6463 21.0937 18.355 21.0937 18.8609 20.7L25.4922 15.5406C25.7844 15.2906 26 14.9062 26 14.5C26 13.6716 25.3281 13 24.5 13H11.5C10.6716 13 10 13.6716 10 14.5C10 14.9062 10.1878 15.2906 10.5091 15.5406Z"
              fill="#6F4CFC"
            />
          </g>
          <rect x="0.5" y="1" width="35" height="35" rx="17.5" stroke="white" />
          <defs>
            <clipPath id="clip0_2273_7065">
              <rect y="0.5" width="36" height="36" rx="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      title: 'Pabbly Hook',
      description: 'Webhook event handling for scalable applications.',
      icon: (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2300_7124)">
            <path
              d="M17.9904 0.5C27.6501 0.5 35.4808 8.33073 35.4808 17.9904V18.0096C35.4808 27.6693 27.6501 35.5 17.9904 35.5C8.33073 35.5 0.5 27.6693 0.5 18.0096V17.9904C0.5 8.33073 8.33073 0.5 17.9904 0.5Z"
              fill="#CFF4FC"
              stroke="white"
            />
            <path
              d="M20.5081 15.482C22.6357 17.6148 22.607 21.035 20.5225 23.1357C20.5129 23.1453 20.5032 23.155 20.4938 23.1645L18.1136 25.5467C16.0004 27.6617 12.5652 27.6617 10.4521 25.5467C8.3389 23.4318 8.3389 19.9937 10.4521 17.8786L11.7741 16.5555C12.1233 16.2061 12.7291 16.4378 12.7469 16.9335C12.7684 17.5648 12.8823 18.1996 13.0926 18.8131C13.1639 19.02 13.1139 19.2518 12.9572 19.4052L12.4904 19.8724C11.4926 20.871 11.4604 22.5009 12.4476 23.5102C13.4454 24.5302 15.0882 24.5338 16.0931 23.5281L18.4877 21.1313C19.4926 20.1256 19.489 18.4992 18.4877 17.5006C18.3558 17.3686 18.2241 17.2652 18.1207 17.1939C18.0475 17.1434 17.9871 17.0764 17.9445 16.9983C17.9018 16.9203 17.878 16.8335 17.8748 16.7446C17.8605 16.3665 17.9925 15.9777 18.2916 15.6817L19.0436 14.9291C19.2396 14.733 19.5496 14.708 19.7777 14.8686C20.0387 15.0512 20.2831 15.2565 20.5081 15.482ZM25.5291 10.4532C23.416 8.3382 19.9808 8.3382 17.8676 10.4532L15.4731 12.8498C15.4694 12.8534 15.4623 12.8606 15.4587 12.8642C13.3705 14.9649 13.342 18.3851 15.4731 20.5179C15.6981 20.7434 15.9425 20.9487 16.2035 21.1313C16.4316 21.2919 16.7416 21.2669 16.9376 21.0708L17.6896 20.3182C17.9887 20.0186 18.1207 19.6334 18.1064 19.2553C18.1032 19.1664 18.0794 19.0796 18.0367 19.0016C17.9941 18.9235 17.9336 18.8565 17.8605 18.806C17.7571 18.7347 17.6254 18.6313 17.4934 18.4992C16.4922 17.497 16.4886 15.8743 17.4934 14.8686L19.8881 12.4718C20.893 11.4661 22.5358 11.4697 23.5335 12.4897C24.5242 13.499 24.4921 15.1253 23.4908 16.1275L23.024 16.5947C22.8673 16.7517 22.8173 16.9799 22.8886 17.1868C23.0989 17.8003 23.2093 18.4351 23.2342 19.0664C23.2521 19.5621 23.8579 19.7939 24.2071 19.4444L25.5291 18.1212C27.6422 16.0062 27.6422 12.5681 25.5291 10.4532Z"
              fill="#05A6C6"
            />
          </g>
          <defs>
            <clipPath id="clip0_2300_7124">
              <rect width="36" height="36" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      title: 'Pabbly ChatFlow',
      description: 'Automate WhatsApp conversation effortlessly.',
      icon: (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2300_7127)">
            <path
              d="M17.9904 0.5C27.6501 0.5 35.4808 8.33073 35.4808 17.9904V18.0096C35.4808 27.6693 27.6501 35.5 17.9904 35.5C8.33073 35.5 0.5 27.6693 0.5 18.0096V17.9904C0.5 8.33073 8.33073 0.5 17.9904 0.5Z"
              fill="#F3DAFF"
              stroke="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18 9C25.4115 9 27 10.3333 27 17C27 21.3333 26.2501 24 22.8752 24C21.0716 24 20.5351 24.8568 20.0355 25.6546C19.6002 26.3497 19.1929 27 18.0002 27C16.8075 27 16.4003 26.3497 15.9649 25.6546C15.4653 24.8568 14.9288 24 13.1252 24C9.75021 24 9 21.248 9 17C9 10.412 10.5885 9 18 9ZM18.75 15C18.75 14.5858 19.0858 14.25 19.5 14.25H21.75C22.1642 14.25 22.5 14.5858 22.5 15C22.5 15.4142 22.1642 15.75 21.75 15.75H19.5C19.0858 15.75 18.75 15.4142 18.75 15ZM14.25 17.25C13.8358 17.25 13.5 17.5857 13.5 18C13.5 18.4143 13.8358 18.75 14.25 18.75H21.75C22.1642 18.75 22.5 18.4143 22.5 18C22.5 17.5857 22.1642 17.25 21.75 17.25H14.25Z"
              fill="#A21FDF"
            />
          </g>
          <defs>
            <clipPath id="clip0_2300_7127">
              <rect width="36" height="36" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      title: 'Pabbly Form Builder',
      description: 'Create forms and gather leads.',
      icon: (
        <svg
          width="36"
          height="37"
          viewBox="0 0 36 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2273_7069)">
            <path
              d="M27.6923 0.5H8.30769C3.71948 0.5 0 4.21948 0 8.80769V28.1923C0 32.7805 3.71948 36.5 8.30769 36.5H27.6923C32.2805 36.5 36 32.7805 36 28.1923V8.80769C36 4.21948 32.2805 0.5 27.6923 0.5Z"
              fill="#FFE5B3"
            />
            <path
              d="M20 11V15H24L20 11ZM19 15V11H13.5C12.6716 11 12 11.6716 12 12.5V25.5C12 26.3281 12.6716 27 13.5 27H22.5C23.3284 27 24 26.3284 24 25.5V16H20.0281C19.4469 16 19 15.5531 19 15ZM20.5 24H15.5C15.225 24 15 23.775 15 23.5C15 23.225 15.225 23 15.5 23H20.5C20.7761 23 21 23.2238 21 23.5C21 23.775 20.775 24 20.5 24ZM20.5 22H15.5C15.225 22 15 21.775 15 21.5C15 21.225 15.225 21 15.5 21H20.5C20.7761 21 21 21.2238 21 21.5C21 21.775 20.775 22 20.5 22ZM21 19.5C21 19.775 20.775 20 20.5 20H15.5C15.225 20 15 19.775 15 19.5C15 19.225 15.225 19 15.5 19H20.5C20.775 19 21 19.225 21 19.5Z"
              fill="#E39806"
            />
          </g>
          <rect x="0.5" y="1" width="35" height="35" rx="17.5" stroke="white" />
          <defs>
            <clipPath id="clip0_2273_7069">
              <rect y="0.5" width="36" height="36" rx="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      title: 'Pabbly Email Verification',
      description: 'Verify and removes bad emails.',
      icon: (
        <svg
          width="36"
          height="37"
          viewBox="0 0 36 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2273_7073)">
            <path
              d="M27.6923 0.5H8.30769C3.71948 0.5 0 4.21948 0 8.80769V28.1923C0 32.7805 3.71948 36.5 8.30769 36.5H27.6923C32.2805 36.5 36 32.7805 36 28.1923V8.80769C36 4.21948 32.2805 0.5 27.6923 0.5Z"
              fill="#BFFFDD"
            />
            <path
              d="M24.707 13.3424C25.0976 13.7982 25.0976 14.5347 24.707 14.9905L16.7065 24.3248C16.3159 24.7807 15.6846 24.7807 15.294 24.3248L11.2929 19.6577C10.9024 19.2019 10.9024 18.4654 11.2929 18.0095C11.6835 17.5537 12.3166 17.5537 12.7073 18.0095L15.9721 21.849L23.2944 13.3424C23.685 12.8859 24.3163 12.8859 24.707 13.3424Z"
              fill="#05C95F"
              stroke="#05C95F"
            />
          </g>
          <rect x="0.5" y="1" width="35" height="35" rx="17.5" stroke="white" />
          <defs>
            <clipPath id="clip0_2273_7073">
              <rect y="0.5" width="36" height="36" rx="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
  ];

  const chunks = [];
  for (let i = 0; i < services.length; i += 5) {
    chunks.push(services.slice(i, i + 5));
  }

  useEffect(() => {
    const handleCarouselChange = (index) => {
      setCurrentCardIndex(index);
    };

    carousel.dots.onClickDot = (index) => {
      carousel.dots.select(index);
      handleCarouselChange(index);
    };

    carousel.arrows.onNext = () => {
      const nextIndex = Math.min(currentCardIndex + 1, chunks.length - 1);
      carousel.arrows.goTo(nextIndex);
      handleCarouselChange(nextIndex);
    };

    carousel.arrows.onPrev = () => {
      const prevIndex = Math.max(currentCardIndex - 1, 0);
      carousel.arrows.goTo(prevIndex);
      handleCarouselChange(prevIndex);
    };

    // No need to explicitly call play() as autoplay is configured in useCarousel
  }, [carousel, currentCardIndex, chunks.length]);

  return (
    <Box
      sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Carousel carousel={carousel}>
        {chunks.map((chunk, index) => (
          <List key={index}>
            {chunk.map((service, serviceIndex) => (
              <ListItem key={serviceIndex}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {service.icon}
                  <Box>
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2">{service.description}</Typography>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        ))}
      </Carousel>
      <CarouselDotButtons
        scrollSnaps={carousel.dots.scrollSnaps}
        selectedIndex={carousel.dots.selectedIndex}
        onClickDot={carousel.dots.onClickDot}
        sx={{ mt: 2, mb: 2 }}
      />
    </Box>
  );
}
