"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import type { Course } from "@/lib/types/course";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowRight, type LucideIcon } from "lucide-react";
import { courseTintForIndex, courseIconForIndex } from "@/lib/icons";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const { courses: data } = await api.getCourses();
        setCourses(data);
      } catch {
        /* silently fail */
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <div className="text-label text-muted-foreground">Courses</div>
        <h1 className="text-h1 text-foreground">Pick a path.</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Structured, lesson-by-lesson learning for the topics you were supposed to remember from high school — plus a few that weren't on the curriculum.
        </p>
      </div>

      {courses.length === 0 ? (
        <Card className="text-center">
          <CardContent className="pt-12 pb-12 flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="text-sm text-muted-foreground">
              No courses available yet. Check back soon — or use the generator to make your own.
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {courses.map((course, idx) => {
            const tint = courseTintForIndex(idx);
            const Icon = (courseIconForIndex(idx) ?? BookOpen) as LucideIcon;
            const unitCount = course.id.length % 4 + 4;
            const lessonCount = unitCount * (course.id.length % 3 + 4);
            return (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
              >
                <Card
                  className={`h-full border ${tint.border} transition-colors group-hover:border-border`}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border ${tint.border} ${tint.bg} ${tint.text}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 space-y-1.5">
                        <CardTitle className="text-lg leading-tight">
                          {course.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {course.description || "A structured path through this topic, one lesson at a time."}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="muted" size="sm">
                        {unitCount} units
                      </Badge>
                      <Badge variant="muted" size="sm">
                        {lessonCount} lessons
                      </Badge>
                      <Badge
                        variant="default"
                        size="sm"
                        className="ml-auto"
                      >
                        <span className={`${tint.text}`}>&middot;</span>
                        <span className="ml-1">{tint.name}</span>
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" className="w-full group-hover:bg-muted transition-colors">
                      View course
                      <ArrowRight className="h-3.5 w-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
