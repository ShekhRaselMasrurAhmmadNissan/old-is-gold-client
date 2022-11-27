import React from 'react';

const Blogs = () => {
	return (
		<div className="flex flex-col justify-center min-h-[66vh] lg:mx-60 md:mx-20">
			<h2 className="text-center text-3xl my-5 font-bold">Blog</h2>
			<div
				tabIndex={0}
				className="collapse border border-base-300 bg-base-100 rounded-box my-4 "
			>
				<div className="collapse-title text-xl font-medium">
					What are the different ways to manage a state in a React
					application?
				</div>
				<div className="collapse-content ">
					<p>
						There are four main types of state you need to properly
						manage in your React apps: Local state Global state
						Server state URL state Let's cover each of these in
						detail: Local (UI) state – Local state is data we manage
						in one or another component. Local state is most often
						managed in React using the useState hook. For example,
						local state would be needed to show or hide a modal
						component or to track values for a form component, such
						as form submission, when the form is disabled and the
						values of a form’s inputs. Global (UI) state – Global
						state is data we manage across multiple components.
						Global state is necessary when we want to get and update
						data anywhere in our app, or in multiple components at
						least. A common example of global state is authenticated
						user state. If a user is logged into our app, it is
						necessary to get and change their data throughout our
						application. Sometimes state we think should be local
						might become global. Server state – Data that comes from
						an external server that must be integrated with our UI
						state. Server state is a simple concept, but can be hard
						to manage alongside all of our local and global UI
						state. There are several pieces of state that must be
						managed every time you fetch or update data from an
						external server, including loading and error state.
						Fortunately there are tools such as SWR and React Query
						that make managing server state much easier. URL state –
						Data that exists on our URLs, including the pathname and
						query parameters. URL state is often missing as a
						category of state, but it is an important one. In many
						cases, a lot of major parts of our application rely upon
						accessing URL state. Try to imagine building a blog
						without being able to fetch a post based off of its slug
						or id that is located in the URL! There are undoubtedly
						more pieces of state that we could identify, but these
						are the major categories worth focusing on for most
						applications you build.
					</p>
				</div>
			</div>
			<div
				tabIndex={0}
				className="collapse border border-base-300 bg-base-100 rounded-box my-4"
			>
				<div className="collapse-title text-xl font-medium">
					How does prototypical inheritance work?
				</div>
				<div className="collapse-content">
					<p>
						The Prototypal Inheritance is a feature in javascript
						used to add methods and properties in objects. It is a
						method by which an object can inherit the properties and
						methods of another object. Traditionally, in order to
						get and set the [[Prototype]] of an object, we use
						Object. getPrototypeOf and Object.
					</p>
				</div>
			</div>
			<div
				tabIndex={0}
				className="collapse border border-base-300 bg-base-100 rounded-box my-4"
			>
				<div className="collapse-title text-xl font-medium">
					What is unit test? Why should we write unit test?
				</div>
				<div className="collapse-content">
					<p>
						Unit tests are typically automated tests written and run
						by software developers to ensure that a section of an
						application (known as the "unit") meets its design and
						behaves as intended. In procedural programming, a unit
						could be an entire module, but it is more commonly an
						individual function or procedure.
					</p>
					<p>
						Unit testing is something you do as you're writing code.
						This testing is testing your view how things should work
						(on the level of class/method/algorithm) and it supports
						you when developing as you can run through the tests
						before and after making changes to see that things are
						still according to the tests you have in place. See this
						as something that will aid the programmer as he/she
						works. Further, the tests will also provide a way to see
						how something is supposed to work for anyone looking at
						the code. TDD (Test-Driven Development) is not changing
						this concept, rather highlighting that the one coding
						needs to first think how it should work and what to
						expect.
					</p>
				</div>
			</div>
			<div
				tabIndex={0}
				className="collapse border border-base-300 bg-base-100 rounded-box my-4"
			>
				<div className="collapse-title text-xl font-medium">
					React vs. Angular vs. Vue?
				</div>
				<div className="collapse-content">
					<p>
						There are three frameworks for building web applications
						that every frontend developer has heard about: React,
						Vue.js, and Angular. React is a UI library, Angular is a
						fully-fledged front-end framework, while Vue.js is a
						progressive framework. They can be used almost
						interchangeably to build front-end applications, but
						they’re not 100 percent the same.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Blogs;
