"use client";

import { useMemo, useState } from "react";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import { Label } from "@repo/design-system/components/ui/label";
import { Switch } from "@repo/design-system/components/ui/switch";
import { Textarea } from "@repo/design-system/components/ui/textarea";

type ReviewComposerProps = {
  filmId: string;
  filmTitle: string;
};

export const ReviewComposer = ({ filmId, filmTitle }: ReviewComposerProps) => {
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [spoiler, setSpoiler] = useState(false);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = useMemo(() => text.trim().length >= 10, [text]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">Your review</div>
          <Badge variant="secondary">Mock</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Label className="text-xs" htmlFor="spoiler">
            Spoilers
          </Label>
          <Switch
            checked={spoiler}
            id="spoiler"
            onCheckedChange={setSpoiler}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="text-xs text-muted-foreground">Rating</div>
        <div className="flex items-center gap-1">
          {([1, 2, 3, 4, 5] as const).map((value) => (
            <Button
              aria-pressed={rating === value}
              key={value}
              onClick={() => setRating(value)}
              size="sm"
              type="button"
              variant={rating === value ? "default" : "secondary"}
            >
              {"★".repeat(value)}
            </Button>
          ))}
        </div>
      </div>

      <Textarea
        onChange={(e) => setText(e.target.value)}
        placeholder={`What did you think about “${filmTitle}”?`}
        rows={5}
        value={text}
      />

      <div className="flex items-center justify-between gap-3">
        <div className="text-muted-foreground text-xs">
          This doesn’t save yet — next step is POST `{filmId}` reviews to
          `apps/api`.
        </div>
        <Button
          disabled={!canSubmit}
          onClick={() => {
            setSubmitted(true);
            setText("");
            setSpoiler(false);
            setRating(5);
            window.setTimeout(() => setSubmitted(false), 2500);
          }}
          type="button"
        >
          Post review
        </Button>
      </div>

      {submitted && (
        <div className="text-sm text-muted-foreground">
          Posted (mock). Wire `apps/api` later and this becomes real.
        </div>
      )}
    </div>
  );
};

