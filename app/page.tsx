"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Users,
  Heart,
  Book,
  Mail,
  Phone,
  Clock,
  Menu,
  X,
  Play,
} from "lucide-react";

const OneLondonChurch = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeStory, setActiveStory] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const heroSlides = [
    {
      title: "Building Community",
      subtitle:
        "A church where faith meets purpose, transforming lives across London",
      cta: "Join Us Sunday",
    },
    {
      title: "Empowering Lives",
      subtitle: "Through worship, fellowship, and service to our community",
      cta: "Get Involved",
    },
    {
      title: "Growing Together",
      subtitle: "Discover your purpose and calling in a loving faith community",
      cta: "Connect With Us",
    },
  ];

  const programs = [
    {
      title: "Youth Ministry",
      description:
        "Empowering the next generation through dynamic worship, biblical teaching, and meaningful connections.",
      image: "/images/one-london-2.jpg",
    },
    {
      title: "Community Outreach",
      description:
        "Serving our neighbors through food banks, homeless support, and local partnerships that make a difference.",
      image: "/images/one-london-3.jpg",
    },
    {
      title: "Worship Ministry",
      description:
        "Creating powerful worship experiences that connect hearts to God through music, arts, and creative expression.",
      image: "/images/one-london-13.png",
    },
    {
      title: "Children's Ministry",
      description:
        "Nurturing young hearts with age-appropriate teaching, fun activities, and a safe environment to grow in faith.",
      image: "/images/one-london-11.png",
    },
  ];

  const stories = [
    {
      name: "Sarah's Story",
      preview:
        "From searching for purpose to finding community and faith at One London. Sarah's journey shows how God works through connection.",
      title: "Finding Home",
    },
    {
      name: "Michael's Story",
      preview:
        "How One London's youth ministry transformed a young man's life and gave him hope for the future.",
      title: "A New Beginning",
    },
    {
      name: "The Johnson Family",
      preview:
        "Discovering faith together as a family through One London's welcoming community and children's programs.",
      title: "Growing Together",
    },
  ];

  const services = [
    {
      title: "Sunday Worship",
      time: "9:00 AM & 11:30 AM",
      description:
        "Join us for inspiring worship, powerful teaching, and authentic community",
    },
    {
      title: "Midweek Connect",
      time: "Wednesday 7:00 PM",
      description:
        "Small group Bible study, prayer, and fellowship in homes across London",
    },
    {
      title: "Friday Youth Night",
      time: "Friday 6:30 PM",
      description:
        "Games, worship, and real conversations for teens and young adults",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 },
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextStory = () => setActiveStory((prev) => (prev + 1) % stories.length);
  const prevStory = () =>
    setActiveStory((prev) => (prev - 1 + stories.length) % stories.length);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-md z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900">
                ONE<span className="text-blue-600">LONDON</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {["Home", "About", "Programs", "Media", "Connect", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
                  >
                    {item}
                  </a>
                ),
              )}
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300">
                Give
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              {["Home", "About", "Programs", "Media", "Connect", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ),
              )}
              <button className="w-full px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300">
                Give
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Slider */}
      <section
        id="home"
        className="pt-20 h-screen relative overflow-hidden bg-gray-900"
      >
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/one-london-12.png"
            alt="One London Church"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative h-full flex items-center justify-center text-center px-4">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
                  {slide.subtitle}
                </p>
                <button className="px-8 py-4 bg-white text-blue-900 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl">
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeSlide ? "w-12 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        id="about"
        ref={(el) => (sectionRefs.current["about"] = el)}
        className="py-20 bg-gray-50"
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible["about"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Transforming Lives & Communities
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                To build a vibrant community of believers who worship God
                passionately, grow spiritually, and serve sacrificially. We are
                committed to making disciples who transform London and beyond
                through authentic relationships and practical ministry.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                To be a beacon of hope in London - a church where everyone
                belongs, lives are transformed, and communities flourish. We
                envision a future where faith meets action, creating lasting
                impact across generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section
        id="programs"
        ref={(el) => (sectionRefs.current["programs"] = el)}
        className="py-20 bg-white"
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible["programs"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Programs
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="h-96 relative overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <h3 className="text-3xl font-bold text-white drop-shadow-lg">
                      {program.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {program.description}
                  </p>
                  <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <div className="aspect-video relative rounded-lg shadow-xl overflow-hidden">
                <Image
                  src="/images/one-london-6.jpg"
                  alt="Youth Ministry"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                YOUTH MINISTRY
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Empowering the Next Generation
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our youth ministry creates a space where young people can
                explore faith, build lasting friendships, and discover their
                God-given purpose. Through weekly gatherings, retreats, and
                service projects, we&apos;re investing in tomorrow&apos;s
                leaders today.
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300">
                See More
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
                COMMUNITY OUTREACH
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Serving Our Neighbors
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                We believe faith without action is incomplete. Our community
                outreach initiatives address real needs in London - from food
                distribution to housing support, job training to mentorship
                programs. Together, we&apos;re making a tangible difference.
              </p>
              <button className="px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all duration-300">
                See More
              </button>
            </div>
            <div>
              <div className="aspect-video relative rounded-lg shadow-xl overflow-hidden">
                <Image
                  src="/images/one-london-7.jpg"
                  alt="Community Outreach"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-video relative rounded-lg shadow-xl overflow-hidden">
                <Image
                  src="/images/one-london-8.jpg"
                  alt="Children's Ministry"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-4">
                CHILDREN&apos;S MINISTRY
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Nurturing Young Hearts
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                We provide a safe, fun, and engaging environment where children
                learn about God&apos;s love through stories, music, and creative
                activities. Our dedicated team ensures every child feels valued,
                loved, and excited to grow in their faith journey.
              </p>
              <button className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all duration-300">
                See More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Schedule */}
      <section
        id="connect"
        ref={(el) => (sectionRefs.current["connect"] = el)}
        className="py-20 bg-white"
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible["connect"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Join Us This Week
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-lg shadow-xl text-white transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6" />
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    Weekly Service
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5" />
                  <span className="text-lg">{service.time}</span>
                </div>
                <p className="text-blue-100 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories of Transformation */}
      <section
        id="media"
        ref={(el) => (sectionRefs.current["media"] = el)}
        className="py-20 bg-gray-50"
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible["media"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Stories of Transformation
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src="/images/one-london-1.jpg"
                    alt={stories[activeStory].name}
                    fill
                    className="object-cover transition-opacity duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {stories[activeStory].title}
                  </h3>
                  <h4 className="text-xl font-semibold text-blue-600 mb-4">
                    {stories[activeStory].name}
                  </h4>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {stories[activeStory].preview}
                  </p>
                  <button className="self-start px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300">
                    Read the Story
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevStory}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={nextStory}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>

            {/* Story Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {stories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStory(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeStory ? "w-8 bg-blue-600" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Series Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                London Faith Stories
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                A video series chronicling the transformative journey of lives
                changed through faith and community at One London
              </p>
              <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center gap-3">
                Watch Series <Play className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-gradient-to-br from-blue-900 to-indigo-900 rounded-lg shadow-2xl flex items-center justify-center group cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-10 h-10 text-blue-600 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={(el) => (sectionRefs.current["contact"] = el)}
        className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible["contact"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Visit Us</h3>
              <p className="text-gray-200">
                123 Westminster Road
                <br />
                London, UK SW1A 1AA
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
              <p className="text-gray-200">+44 20 1234 5678</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
              <p className="text-gray-200">hello@onelondon.church</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                ONE<span className="text-blue-400">LONDON</span>
              </h3>
              <p className="text-gray-400">
                A church dedicated to transforming lives and communities through
                faith, hope, and love.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {["About", "Programs", "Media", "Give"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="block text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="space-y-2">
                {["Volunteer", "Events", "Blog", "Contact"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <div className="space-y-2 text-gray-400">
                <p>123 Westminster Road</p>
                <p>London, UK SW1A 1AA</p>
                <p>+44 20 1234 5678</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 One London Church. All rights reserved.</p>
            <p className="text-sm mt-2">Built with faith and purpose</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OneLondonChurch;
