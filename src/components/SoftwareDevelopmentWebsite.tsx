import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRight, ChevronRight, Menu, X, Workflow, Zap, Plug, Timer, Bot, Dna, CheckCircle } from "lucide-react"
import { motion, type Variants } from "framer-motion"
import { GridMotion } from "./ui/grid-motion"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
)
CardContent.displayName = "CardContent"

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

function AnimatedGroup({
  children,
  className,
  variants,
}: {
  children: React.ReactNode
  className?: string
  variants?: {
    container?: Variants
    item?: Variants
  }
}) {
  const containerVariants = variants?.container || defaultContainerVariants
  const itemVariants = variants?.item || defaultItemVariants

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className={cn(className)}>
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

const menuItems = [
  { name: "Возможности", href: "#services" },
  { name: "Интеграции", href: "#solutions" },
  { name: "Кейсы", href: "#about" },
  { name: "Контакты", href: "#contact" },
]

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header>
      <nav data-state={menuState && "active"} className="fixed z-20 w-full px-2 group">
        <div
          className={cn(
            "mx-auto mt-1 max-w-4xl px-4 transition-all duration-300 lg:px-8",
            isScrolled && "bg-background/50 max-w-3xl rounded-2xl border backdrop-blur-lg lg:px-4",
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-0">
            <div className="flex w-full justify-between lg:w-auto">
              <a href="/" aria-label="home" className="flex items-center space-x-2">
                <Logo />
              </a>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Закрыть меню" : "Открыть меню"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button variant="outline" size="sm" className={cn(isScrolled && "lg:hidden")} asChild>
                  <a href="https://t.me/Ai_agenty_ash" target="_blank" rel="noopener noreferrer">
                    <span>Канал</span>
                  </a>
                </Button>
                <Button
                  size="sm"
                  className={cn(
                    isScrolled
                      ? "lg:inline-flex bg-orange-500 hover:bg-orange-600"
                      : "hidden bg-orange-500 hover:bg-orange-600",
                  )}
                  asChild
                >
                  <a href="https://t.me/gudkova_ash" target="_blank" rel="noopener noreferrer">
                    <span>Начать</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="bg-orange-500 rounded-lg p-2">
        <Workflow className="h-6 w-6 text-white" />
      </div>
      <span className="text-xl font-bold">Ашхен Гудкова</span>
    </div>
  )
}

const CardDecorator = ({ children }: { children: React.ReactNode }) => (
  <div
    aria-hidden
    className="relative mx-auto size-36 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
  >
    <div className="absolute inset-0 [--border:black] dark:[--border:white] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l border-orange-200">
      {children}
    </div>
  </div>
)

export default function SoftwareDevelopmentWebsite() {
  const gridItems = [
    "https://cdn.poehali.dev/templates/landing-page/fluid-gradient.jpg",
    "https://cdn.poehali.dev/templates/landing-page/vr-experience.jpg",
    "https://cdn.poehali.dev/templates/landing-page/ai-whiteboard.jpg",
    "https://cdn.poehali.dev/templates/landing-page/human-ai.jpg",
    "https://cdn.poehali.dev/templates/landing-page/digital-eye.jpg",
    "https://cdn.poehali.dev/templates/landing-page/robot.jpg",
    "https://cdn.poehali.dev/templates/landing-page/purple-flow.jpg",
    "https://cdn.poehali.dev/templates/landing-page/data-beam.jpg",
    "https://cdn.poehali.dev/templates/landing-page/ai-keyboard.jpg",
    "https://cdn.poehali.dev/templates/landing-page/fiber-optic.jpg",
    "https://cdn.poehali.dev/templates/landing-page/fluid-gradient.jpg",
    "https://cdn.poehali.dev/templates/landing-page/vr-experience.jpg",
    "https://cdn.poehali.dev/templates/landing-page/ai-whiteboard.jpg",
    "https://cdn.poehali.dev/templates/landing-page/human-ai.jpg",
    "https://cdn.poehali.dev/templates/landing-page/digital-eye.jpg",
    "https://cdn.poehali.dev/templates/landing-page/robot.jpg",
    "https://cdn.poehali.dev/templates/landing-page/purple-flow.jpg",
    "https://cdn.poehali.dev/templates/landing-page/data-beam.jpg",
    "https://cdn.poehali.dev/templates/landing-page/ai-keyboard.jpg",
    "https://cdn.poehali.dev/templates/landing-page/fiber-optic.jpg",
    "https://cdn.poehali.dev/templates/landing-page/fluid-gradient.jpg",
    "https://cdn.poehali.dev/templates/landing-page/vr-experience.jpg",
    "https://cdn.poehali.dev/templates/landing-page/ai-whiteboard.jpg",
    "https://cdn.poehali.dev/templates/landing-page/human-ai.jpg",
    "https://cdn.poehali.dev/templates/landing-page/digital-eye.jpg",
    "https://cdn.poehali.dev/templates/landing-page/robot.jpg",
  ]

  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <div
          aria-hidden
          className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block"
        >
          <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(25,100%,50%,.08)_0,hsla(25,100%,45%,.02)_50%,hsla(25,100%,40%,0)_80%)]" />
          <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(25,100%,50%,.06)_0,hsla(25,100%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
        </div>

        <section>
          <div className="relative pt-24 md:pt-36">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
            />
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <a
                    href="#services"
                    className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                  >
                    <span className="text-foreground text-sm">Автоматизация бизнес-процессов на n8n</span>
                    <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </a>

                  <h1 className="mt-8 max-w-4xl mx-auto text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]">
                    Освободите время с{" "}
                    <span className="inline-block text-orange-500 text-6xl md:text-7xl xl:text-[5.25rem] font-semibold">
                      умной автоматизацией
                    </span>
                  </h1>
                  <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground">
                    Настраиваем n8n-воркфлоу под ваш бизнес — связываем CRM, мессенджеры, таблицы и сервисы без единой строки кода. Вы занимаетесь бизнесом, рутина работает сама.
                  </p>
                </AnimatedGroup>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  <div key={1} className="bg-orange-500/10 rounded-[14px] border border-orange-200 p-0.5">
                    <Button size="lg" className="rounded-xl px-5 text-base bg-orange-500 hover:bg-orange-600" asChild>
                      <a href="https://t.me/gudkova_ash" target="_blank" rel="noopener noreferrer">
                        <span className="text-nowrap">Получить консультацию</span>
                      </a>
                    </Button>
                  </div>
                  <Button key={2} size="lg" variant="ghost" className="h-10.5 rounded-xl px-5 hover:text-orange-500" asChild>
                    <a href="https://t.me/Ai_agenty_ash" target="_blank" rel="noopener noreferrer">
                      <span className="text-nowrap">Примеры автоматизаций</span>
                    </a>
                  </Button>
                </AnimatedGroup>
              </div>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                <div
                  aria-hidden
                  className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                />
                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-orange-200 p-4 shadow-lg shadow-orange-500/15 ring-1">
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 aspect-[15/8] relative rounded-2xl border border-orange-200 overflow-hidden">
                    <GridMotion items={gridItems} gradientColor="rgba(249, 115, 22, 0.1)" className="h-full w-full" />
                  </div>
                </div>
              </div>

              <section className="bg-background pb-16 pt-16 md:pb-32">
                <div className="group relative m-auto max-w-5xl px-6">
                  <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
                    <a href="#contact" className="block text-sm duration-150 hover:opacity-75 text-orange-500">
                      <span>Готовы автоматизировать бизнес?</span>
                      <ChevronRight className="ml-1 inline-block size-3" />
                    </a>
                  </div>
                  <div className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14">
                    <div className="flex">
                      <img
                        className="mx-auto h-5 w-fit dark:invert opacity-60"
                        src="https://html.tailus.io/blocks/customers/nvidia.svg"
                        alt="Логотип клиента"
                        height="20"
                        width="auto"
                      />
                    </div>
                    <div className="flex">
                      <img
                        className="mx-auto h-4 w-fit dark:invert opacity-60"
                        src="https://html.tailus.io/blocks/customers/column.svg"
                        alt="Логотип клиента"
                        height="16"
                        width="auto"
                      />
                    </div>
                    <div className="flex">
                      <img
                        className="mx-auto h-4 w-fit dark:invert opacity-60"
                        src="https://html.tailus.io/blocks/customers/github.svg"
                        alt="Логотип клиента"
                        height="16"
                        width="auto"
                      />
                    </div>
                    <div className="flex">
                      <img
                        className="mx-auto h-5 w-fit dark:invert opacity-60"
                        src="https://html.tailus.io/blocks/customers/nike.svg"
                        alt="Логотип клиента"
                        height="20"
                        width="auto"
                      />
                    </div>
                    <div className="flex">
                      <img
                        className="mx-auto h-5 w-fit dark:invert opacity-60"
                        src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                        alt="Логотип клиента"
                        height="20"
                        width="auto"
                      />
                    </div>
                    <div className="flex">
                      <img
                        className="mx-auto h-4 w-fit dark:invert opacity-60"
                        src="https://html.tailus.io/blocks/customers/laravel.svg"
                        alt="Логотип клиента"
                        height="16"
                        width="auto"
                      />
                    </div>
                    <div className="flex">
                      <img
                        className="mx-auto h-7 w-fit dark:invert opacity-60"
                        src="https://html.tailus.io/blocks/customers/lilly.svg"
                        alt="Логотип клиента"
                        height="28"
                        width="auto"
                      />
                    </div>
                    <div className="flex">
                      <img
                        className="mx-auto h-6 w-fit dark:invert opacity-60"
                        src="https://html.tailus.io/blocks/customers/openai.svg"
                        alt="Логотип клиента"
                        height="24"
                        width="auto"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </AnimatedGroup>
          </div>
        </section>

        <section className="bg-muted/50 py-16 md:py-32 dark:bg-transparent">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center">
              <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
                Почему выбирают <span className="text-orange-500">AI Агенты</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Автоматизируем рутину на n8n — экономим десятки часов в месяц, убираем ошибки и связываем все ваши сервисы в единую систему.
              </p>
            </div>
            <Card className="mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 border-orange-200 *:text-center md:mt-16 md:max-w-full md:grid-cols-3 md:divide-x md:divide-y-0">
              <div className="group shadow-zinc-950/5">
                <CardHeader className="pb-3">
                  <CardDecorator>
                    <Timer className="size-6 text-orange-500" aria-hidden />
                  </CardDecorator>

                  <h3 className="mt-6 font-medium">Экономия времени</h3>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Рутинные задачи выполняются автоматически 24/7. Вы экономите от 20 до 80 часов в месяц на ручной работе.
                  </p>
                </CardContent>
              </div>

              <div className="group shadow-zinc-950/5">
                <CardHeader className="pb-3">
                  <CardDecorator>
                    <Plug className="size-6 text-orange-500" aria-hidden />
                  </CardDecorator>

                  <h3 className="mt-6 font-medium">400+ интеграций</h3>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    CRM, Telegram, Google Sheets, Notion, Битрикс24, WhatsApp — связываем любые сервисы в единую цепочку.
                  </p>
                </CardContent>
              </div>

              <div className="group shadow-zinc-950/5">
                <CardHeader className="pb-3">
                  <CardDecorator>
                    <Zap className="size-6 text-orange-500" aria-hidden />
                  </CardDecorator>

                  <h3 className="mt-6 font-medium">Без кода и ИТ-отдела</h3>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Настраиваем всё под ключ — вам не нужны программисты. Просто опишите задачу, мы автоматизируем.
                  </p>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
        {/* About Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="rounded-2xl border border-orange-200 bg-muted/20 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left — intro */}
                <div className="p-8 lg:p-12 space-y-6 border-b lg:border-b-0 lg:border-r border-orange-200">
                  <div>
                    <div className="text-xs font-medium text-orange-500 uppercase tracking-wide mb-3">Привет!</div>
                    <h2 className="text-3xl font-semibold leading-snug">
                      Меня зовут <span className="text-orange-500">Ашхен Гудкова</span>
                    </h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      Вы попали в мою лабораторию AI-агентов, где мы превращаем сложные задачи в 1 клик.
                    </p>
                  </div>
                  <div className="bg-orange-500/10 border border-orange-200 rounded-xl p-4">
                    <p className="text-sm font-medium text-foreground mb-1">Мой фокус</p>
                    <p className="text-sm text-muted-foreground">
                      Я не обучаю — я создаю готовые цифровые решения и автоматизации на заказ. Показываю новые возможности технологий и освобождаю вашу голову от рутины.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <a href="https://t.me/gudkova_ash" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                      @gudkova_ash — написать напрямую
                    </a>
                    <a href="https://t.me/reviews_ash" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                      Отзывы о работе
                    </a>
                  </div>
                </div>

                {/* Right — channel content */}
                <div className="p-8 lg:p-12 space-y-6">
                  <div>
                    <div className="text-xs font-medium text-orange-500 uppercase tracking-wide mb-3">3 причины подписаться на канал</div>
                    <a href="https://t.me/Ai_agenty_ash" target="_blank" rel="noopener noreferrer"
                      className="text-sm font-semibold hover:text-orange-500 transition-colors">t.me/Ai_agenty_ash</a>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Реализованные проекты</p>
                      <div className="space-y-1.5 text-sm text-muted-foreground">
                        {[
                          { label: "Бот «Карманный маркетолог»", href: "https://t.me/Ai_agenty_ash/238" },
                          { label: "AI-агент для создания контента", href: "https://t.me/Ai_agenty_ash/227" },
                          { label: "Обработка больших данных: ДНК", href: "https://t.me/Ai_agenty_ash/208" },
                          { label: "Секретарь 24/7: голос → Notion", href: "https://t.me/Ai_agenty_ash/169" },
                        ].map((item, i) => (
                          <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                            <ArrowRight className="h-3 w-3 text-orange-500 shrink-0" />
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Хаки и инструменты</p>
                      <div className="space-y-1.5 text-sm text-muted-foreground">
                        {[
                          { label: "Взлом промптов", href: "https://t.me/Ai_agenty_ash/184" },
                          { label: "Фотошоп AI: 3 приёма идеальной генерации", href: "https://t.me/Ai_agenty_ash/206" },
                        ].map((item, i) => (
                          <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                            <ArrowRight className="h-3 w-3 text-orange-500 shrink-0" />
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">AI-агенты — попробуй сам</p>
                      <div className="space-y-1.5 text-sm text-muted-foreground">
                        {[
                          { label: "@ZvukovoeUtroBot — планировщик и мотивация", href: "https://t.me/ZvukovoeUtroBot" },
                          { label: "@analytics_pars_bot — AI-фотосессии", href: "https://t.me/analytics_pars_bot" },
                        ].map((item, i) => (
                          <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                            <ArrowRight className="h-3 w-3 text-orange-500 shrink-0" />
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cases Section */}
        <section className="py-16 md:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
                Реальные <span className="text-orange-500">кейсы</span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Системы, которые уже работают и приносят прибыль клиентам
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Case 1 */}
              <div className="rounded-2xl border border-orange-200 bg-muted/30 p-8 space-y-6 hover:border-orange-400 transition-colors duration-300">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-500 rounded-xl p-3 shrink-0">
                    <Bot className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-orange-500 uppercase tracking-wide mb-1">Telegram-бот</div>
                    <h3 className="text-xl font-semibold">Карманный маркетолог</h3>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  AI-бот с 9 агентами для написания контента в соцсети. База знаний с видео по блокам, реферальная система, оплата через GetCourse с автооплатой и системой дожимных писем.
                </p>

                <div className="space-y-2">
                  {[
                    "19 воркфлоу — контент, оплата, напоминания",
                    "Система дожима: письма за 3, 2, 1 день до оплаты",
                    "Supabase: состояния, ниша, ЦА, цели пользователя",
                    "Error-handler — уведомления пользователю и админу",
                    "Дашборд аналитики: новые, оплатившие, касания",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-orange-200">
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-2xl font-bold text-orange-500">2 нед.</div>
                      <div className="text-xs text-muted-foreground">до запуска MVP</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-500">1 нед.</div>
                      <div className="text-xs text-muted-foreground">до окупаемости</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-500">19</div>
                      <div className="text-xs text-muted-foreground">воркфлоу</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case 2 */}
              <div className="rounded-2xl border border-orange-200 bg-muted/30 p-8 space-y-6 hover:border-orange-400 transition-colors duration-300">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-500 rounded-xl p-3 shrink-0">
                    <Dna className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-orange-500 uppercase tracking-wide mb-1">Медицина / ДНК</div>
                    <h3 className="text-xl font-semibold">Анализатор ДНК</h3>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  Система анализа сырых ДНК-данных пациента: 627 тысяч маркеров парсятся, сопоставляются с экспертной базой в Supabase и формируют персональный отчёт с рекомендациями.
                </p>

                <div className="space-y-2">
                  {[
                    "627 000 ДНК-маркеров из сырого файла пациента",
                    "SQL-запросы к базе экспертных интерпретаций",
                    "Полный PDF-отчёт с рекомендациями по генам",
                    "Саммари от нейросети в текстовом формате",
                    "Чек-лист с ключевыми находками для пациента",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-orange-200">
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-2xl font-bold text-orange-500">627K</div>
                      <div className="text-xs text-muted-foreground">ДНК-маркеров</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-500">3</div>
                      <div className="text-xs text-muted-foreground">формата отчёта</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-500">AI</div>
                      <div className="text-xs text-muted-foreground">интерпретация</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="bg-orange-500/10 rounded-[14px] border border-orange-200 p-0.5 inline-block">
                <Button size="lg" className="rounded-xl px-8 text-base bg-orange-500 hover:bg-orange-600" asChild>
                  <a href="https://t.me/gudkova_ash" target="_blank" rel="noopener noreferrer">
                    <span>Обсудить похожий проект</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">Напишите в Telegram — разберём задачу и предложим решение</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t border-orange-200">
        <div className="mx-auto max-w-7xl py-16 px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <Logo />
              <p className="text-sm text-muted-foreground max-w-xs">
                Автоматизируем бизнес-процессы на n8n — освобождаем ваше время от рутины и связываем все сервисы в единую умную систему.
              </p>
              <div className="flex space-x-3">
                <a href="https://t.me/gudkova_ash" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  <span>@gudkova_ash</span>
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Автоматизации</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://t.me/gudkova_ash" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-orange-500 transition-colors">
                    CRM и продажи
                  </a>
                </li>
                <li>
                  <a href="https://t.me/gudkova_ash" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-orange-500 transition-colors">
                    Telegram-боты
                  </a>
                </li>
                <li>
                  <a href="https://t.me/gudkova_ash" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-orange-500 transition-colors">
                    Email и уведомления
                  </a>
                </li>
                <li>
                  <a href="https://t.me/gudkova_ash" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-orange-500 transition-colors">
                    Отчёты и таблицы
                  </a>
                </li>
                <li>
                  <a href="https://t.me/gudkova_ash" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-orange-500 transition-colors">
                    AI-воркфлоу
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Компания</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#about" className="text-muted-foreground hover:text-orange-500 transition-colors">
                    О себе
                  </a>
                </li>
                <li>
                  <a href="https://t.me/Ai_agenty_ash" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-orange-500 transition-colors">
                    Telegram-канал
                  </a>
                </li>
                <li>
                  <a href="https://t.me/reviews_ash" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-orange-500 transition-colors">
                    Отзывы
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-muted-foreground hover:text-orange-500 transition-colors">
                    Кейсы
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Контакты</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="https://t.me/gudkova_ash" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                    <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    <span>@gudkova_ash — написать</span>
                  </a>
                </li>
                <li>
                  <a href="https://t.me/Ai_agenty_ash" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                    <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    <span>Telegram-канал</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-12 pt-8 border-t border-orange-200">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-sm text-muted-foreground">2025 Ашхен Гудкова. Все права защищены.</div>
              <div className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2 text-sm">
                <a href="https://t.me/gudkova_ash" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-orange-500 transition-colors">
                  Написать в Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}