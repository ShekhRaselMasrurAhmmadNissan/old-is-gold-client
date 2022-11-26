import React from 'react';
import banner from '../../../Assets/banner.jpg';

const Banner = () => {
	return (
		<div className="relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
			<div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
				<svg
					className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
					viewBox="0 0 100 100"
					fill="currentColor"
					preserveAspectRatio="none slice"
				>
					<path d="M50 0H100L50 100H0L50 0Z" />
				</svg>
				<img
					className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
					src={banner}
					alt=""
				/>
			</div>
			<div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
				<div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
					<h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl sm:leading-none">
						A good book, <br className="hidden md:block" />
						<span className="inline-block text-deep-purple-accent-400">
							worth 100 friends.
						</span>
					</h2>
					<p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
						Book is the container of knowledge. A great book can
						provide knowledge as large as an ocean. By reading
						books, one can find inner peace. A book can disclose
						many hidden details and histories that would have remain
						hidden if that's not for a book.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Banner;
