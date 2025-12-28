import { cn } from "@/lib/utils";
import { CoreData } from "@repo/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

const CoreCard = ({ core }: { core: CoreData }) => (
  <Card key={core.id} className="gap-0">
    <CardHeader>
      <CardTitle>Core {core.id + 1}</CardTitle>
    </CardHeader>
    <CardContent>
      <Progress
        value={core.usage}
        indicatorClassName={cn(
          core.usage < 20 && "bg-green-500",
          core.usage >= 20 && core.usage <= 50 && "bg-yellow-500",
          core.usage >= 50 && core.usage <= 80 && "bg-orange-500",
          core.usage > 80 && "bg-red-500"
        )}
      />
      <span className="text-sm text-muted-foreground">
        {core.usage.toFixed(2)}%
      </span>
    </CardContent>
  </Card>
);

export default CoreCard;
