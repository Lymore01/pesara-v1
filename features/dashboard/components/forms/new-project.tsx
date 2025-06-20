import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function NewProject() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-xs dark:hover:bg-brand-accent text-foreground dark:bg-brand flex items-center cursor-pointer"
          >
            <Plus size={12} /> New Project
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[40%] bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle className="font-medium text-base">Create a new project</DialogTitle>
            <DialogDescription className="text-sm text-pretty">
              Credentials will be provided to integrate Pesara to this project. You can update these
              details later in your project settings.
            </DialogDescription>
          </DialogHeader>

          <ProjectForm />
        </DialogContent>
      </form>
    </Dialog>
  );
}

const formSchema = z.object({
  name: z.string().min(2, "Project name is required"),
  description: z.string().optional(),
});

export const ProjectForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Pesara Payments" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description <span className="text-muted-foreground">(optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your project..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="text-xs">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant={"outline"}
            className="text-xs dark:hover:bg-brand-accent text-foreground dark:bg-brand flex items-center cursor-pointer"
          >
            Create Project
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
