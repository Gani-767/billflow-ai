import { Check, CheckCheck, FileText, Paperclip, Mic, Smile } from "lucide-react";

export function ChatMockup() {
  return (
    <div className="relative mx-auto w-full scale-[0.92] sm:scale-100">
      <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-b from-primary/15 to-transparent blur-2xl sm:-inset-4" />
      <div className="relative rounded-[2.25rem] bg-ink p-2 shadow-phone ring-1 ring-foreground/10 sm:rounded-[2.75rem] sm:p-2.5">
        <div className="overflow-hidden rounded-[1.85rem] bg-chat-bg sm:rounded-[2.25rem]">
          <div className="flex items-center gap-2.5 bg-whatsapp px-3 py-3 text-primary-foreground sm:gap-3 sm:px-4 sm:py-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-foreground/20 font-display text-xs font-semibold ring-2 ring-primary-foreground/30 sm:h-10 sm:w-10 sm:text-sm">
              BF
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">BillFlow AI</div>
              <div className="flex items-center gap-1.5 text-[10px] opacity-90 sm:text-[11px]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-foreground animate-pulse" />
                online
              </div>
            </div>
          </div>

          <div className="min-h-[320px] space-y-2 px-2.5 py-4 sm:min-h-[380px] sm:space-y-2.5 sm:px-3 sm:py-5">
            <UserBubble delay="0s">
              Invoice for Ravi ₹5000 logo design
              <Meta time="10:24" />
            </UserBubble>

            <BotBubble delay="0.4s">
              Got it. Creating <b>#INV-0421</b> for <b>Ravi</b> — ₹5,000 (Logo design)
            </BotBubble>

            <BotBubble delay="0.9s" pad>
              <div className="flex items-center gap-2 rounded-lg border border-border/80 bg-background p-2.5 shadow-soft sm:gap-3 sm:rounded-xl sm:p-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:h-11 sm:w-11">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[11px] font-semibold text-foreground sm:text-xs">
                    INV-0421-Ravi.pdf
                  </div>
                  <div className="text-[9px] text-muted-foreground sm:text-[10px]">
                    142 KB · Ready to send
                  </div>
                </div>
              </div>
            </BotBubble>

            <BotBubble delay="1.4s">
              Sent to Ravi. Auto-reminder scheduled in 3 days if unpaid.
            </BotBubble>

            <UserBubble delay="2s">
              Perfect
              <Meta time="10:24" />
            </UserBubble>
          </div>

          <div className="flex items-center gap-1.5 border-t border-border/60 bg-background/90 px-2.5 py-2 sm:gap-2 sm:px-3 sm:py-2.5">
            <Smile className="h-4 w-4 shrink-0 text-muted-foreground sm:h-5 sm:w-5" />
            <div className="min-w-0 flex-1 truncate rounded-full bg-muted px-2.5 py-1.5 text-[10px] text-muted-foreground sm:px-3 sm:py-2 sm:text-xs">
              Type a message
            </div>
            <Paperclip className="h-4 w-4 shrink-0 text-muted-foreground sm:h-5 sm:w-5" />
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-whatsapp sm:h-9 sm:w-9">
              <Mic className="h-3.5 w-3.5 text-primary-foreground sm:h-4 sm:w-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-12 hidden max-w-[120px] animate-float-up items-center gap-1.5 rounded-lg border border-border/80 bg-card/95 px-2 py-1.5 shadow-soft backdrop-blur-sm md:flex">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-chart-3" />
        <span className="text-[10px] font-medium leading-tight">PDF in 4.2s</span>
      </div>
      <div
        className="absolute bottom-20 right-0 hidden max-w-[120px] animate-float-up items-center gap-1.5 rounded-lg border border-border/80 bg-card/95 px-2 py-1.5 shadow-soft backdrop-blur-sm md:flex"
        style={{ animationDelay: "0.2s" }}
      >
        <CheckCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
        <span className="text-[10px] font-medium leading-tight">Reminder set</span>
      </div>
    </div>
  );
}

function UserBubble({ children, delay }: { children: React.ReactNode; delay: string }) {
  return (
    <div className="flex justify-end animate-float-up" style={{ animationDelay: delay }}>
      <div className="relative max-w-[85%] rounded-2xl rounded-tr-md bg-whatsapp-bubble px-3 py-1.5 text-xs text-ink shadow-sm sm:max-w-[78%] sm:px-3.5 sm:py-2 sm:text-sm">
        {children}
      </div>
    </div>
  );
}

function BotBubble({
  children,
  delay,
  pad,
}: {
  children: React.ReactNode;
  delay: string;
  pad?: boolean;
}) {
  return (
    <div className="flex justify-start animate-float-up" style={{ animationDelay: delay }}>
      <div
        className={`max-w-[90%] rounded-2xl rounded-tl-md bg-card text-xs text-ink shadow-sm sm:max-w-[85%] sm:text-sm ${pad ? "p-1.5 sm:p-2" : "px-3 py-1.5 sm:px-3.5 sm:py-2"}`}
      >
        {children}
      </div>
    </div>
  );
}

function Meta({ time }: { time: string }) {
  return (
    <span className="ml-1.5 inline-flex items-center gap-0.5 align-middle text-[9px] text-ink-soft/70 sm:ml-2 sm:gap-1 sm:text-[10px]">
      {time} <Check className="h-2.5 w-2.5 text-whatsapp sm:h-3 sm:w-3" />
    </span>
  );
}
