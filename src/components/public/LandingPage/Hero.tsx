'use client';

import { useTranslations, useLocale } from 'next-intl';
import { FaArrowLeft, FaArrowRight, FaPlay } from 'react-icons/fa';
import { Section, Container } from './helpers';
import React, { useRef, useEffect } from 'react';

const Hero = () => {
  const t = useTranslations('LandingPage.Hero');
  const locale = useLocale();
  const isRtl = locale === 'ar' || locale === 'dz';
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx = context as CanvasRenderingContext2D; // استخدم ctx لضمان عدم وجود null داخل الدوال

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let particles: Particle[] = [];
    const particleCount = Math.floor((width * height) / 8000);
    const mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 1.5 + 1;
        this.vx = Math.random() * 1 - 0.5;
        this.vy = Math.random() * 1 - 0.5;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(235, 119, 53, 0.8)';
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * 2;
          this.y += Math.sin(angle) * 2;
        }
      }
    }

    function init() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function connect() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(235, 119, 53, ${1 - dist / 120})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    let animationFrameId = 0;
    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connect();
      animationFrameId = requestAnimationFrame(animate);
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.offsetHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRtl]);

  return (
    <Section
      id="home"
      className="relative text-white text-center bg-black min-h-[75vh] md:min-h-screen flex items-center justify-center overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      ></canvas>
      <div className="absolute inset-0 bg-black/60"></div>
      <Container className="relative z-10 flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
          {t('title')}
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-md md:max-w-3xl mx-auto mb-8">
          {t('subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#pricing"
            className="bg-[#EB7735] text-white px-6 py-3 text-base sm:px-8 sm:text-lg rounded-full font-bold hover:bg-orange-700 transition-colors duration-300 flex items-center justify-center"
          >
            <span>{t('ctaPrimary')}</span>
            {isRtl ? (
              <FaArrowLeft className="mr-2" />
            ) : (
              <FaArrowRight className="ml-2" />
            )}
          </a>
          <a
            href="#"
            className="bg-gray-700/80 text-white px-6 py-3 text-base sm:px-8 sm:text-lg rounded-full font-bold hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center"
          >
            <FaPlay className={isRtl ? 'ml-2' : 'mr-2'} />
            <span>{t('ctaSecondary')}</span>
          </a>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
