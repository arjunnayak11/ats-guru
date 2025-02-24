import { useState } from "react";
import { FileText, CheckCircle, Zap, Target, Star, ArrowRight, Users, BarChart, Layout, Book, Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [showResults, setShowResults] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const navigate = useNavigate();

  const navigationItems = [
    { name: "Features", path: "#features" },
    { name: "How It Works", path: "/HIW" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" }
  ];

  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "ATS-Friendly Format",
      description: "Ensure your resume follows ATS formatting guidelines"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Keyword Analysis",
      description: "Check if your resume includes essential industry keywords"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Feedback",
      description: "Get immediate insights on your resume's ATS compatibility"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Job Match Score",
      description: "Compare your resume against specific job descriptions"
    }
  ];

  const handleNavigation = (path: string) => {
    if (path.startsWith('#')) {
      setActiveSection(path.substring(1));
    } else {
      navigate(path);
    }
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      content: "This tool helped me optimize my resume and land my dream job!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      content: "The keyword analysis feature is incredibly useful.",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Marketing Director",
      content: "Simple yet powerful. Highly recommended!",
      rating: 5
    }
  ];

  const statistics = [
    { value: "95%", label: "Success Rate" },
    { value: "50K+", label: "Resumes Scanned" },
    { value: "24/7", label: "Support Available" },
    { value: "100+", label: "Industry Templates" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              ATS Guru
            </span>
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              {navigationItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        handleNavigation(item.path);
                      }}
                    >
                      {item.name}
                    </Button>
                  ))}
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
                    onClick={() => navigate('/upload')}
                  >
                    Get Started
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop CTA Button */}
          <Button 
            className="hidden md:flex bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
            onClick={() => navigate('/upload')}
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/5 via-purple-500/5 to-transparent border-b">
        <div className="container py-20 md:py-32">
          <div className="text-center space-y-8 animate-fade-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 animate-pulse">
              Smart Resume Analysis
            </div>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent animate-scale-in">
              Optimize Your Resume for ATS
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "200ms" }}>
              Don't let your perfect resume get lost in the ATS void. Get instant feedback and improve your chances of landing that dream job.
            </p>
            <div className="flex justify-center gap-4 animate-fade-up" style={{ animationDelay: "400ms" }}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
                onClick={() => navigate('/upload')}
              >
                Start Scanning <ArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid with Hover Effects */}
      <div className="container py-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Powerful Features</h2>
          <p className="text-muted-foreground">Everything you need to optimize your resume</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 backdrop-blur-sm bg-white/50 border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
            >
              <div className="space-y-4">
                <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y">
          {statistics.map((stat, index) => (
            <div key={index} className="text-center space-y-2 animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="py-24 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="text-muted-foreground">Three simple steps to optimize your resume</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Layout />, title: "Upload Resume", desc: "Upload your resume in PDF format" },
              { icon: <BarChart />, title: "Analyze", desc: "Our AI analyzes your resume against ATS criteria" },
              { icon: <Book />, title: "Get Feedback", desc: "Receive detailed feedback and suggestions" }
            ].map((step, index) => (
              <div key={index} className="text-center space-y-4 animate-fade-up" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-24 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">What Our Users Say</h2>
            <p className="text-muted-foreground">Join thousands of satisfied users</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow animate-fade-up" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="space-y-4">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{testimonial.content}</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Footer */}
        <footer className="border-t bg-muted/50 mt-24">
          <div className="container py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Features</li>
                  <li>Pricing</li>
                  <li>FAQ</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>About</li>
                  <li>Careers</li>
                  <li>Blog</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Resources</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Documentation</li>
                  <li>Guides</li>
                  <li>Support</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Privacy</li>
                  <li>Terms</li>
                  <li>Security</li>
                </ul>
              </div>
            </div>
            <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>Helping job seekers optimize their resumes for ATS systems</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
