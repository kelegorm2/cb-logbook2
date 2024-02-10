"use client";
import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewLogSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addLogToProject } from "@/actions/projects/projects";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import styles from "@/app/general.module.css";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";

type PropType = {
  tags: {
    id: string;
    name: string;
  }[];
  projectId: string;
};

export default function CreateProject(props: PropType) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof NewLogSchema>>({
    resolver: zodResolver(NewLogSchema),
    defaultValues: {
      description: "",
      logs: [],
    },
  });

  const onSubmit = (values: z.infer<typeof NewLogSchema>) => {
    //console.log("🚀 ~ onSubmit ~ values:", values);
    setError("");
    setSuccess("");

    startTransition(() => {
      addLogToProject(props.projectId, values).then((data) => {
        setError(data.error);
        if (data.success) {
          router.push(`/project/${props.projectId}`);
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isPending}
                    placeholder="What happened?"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={styles.tagsWrapper}>
            {props.tags.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name="logs"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-start space-x-1 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {item.name}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit" className="w-full my-8">
          Create an Project
        </Button>
      </form>
    </Form>
  );
}
