import type {
  Metadata,
} from "next";

import {
  ProjectsPage,
} from "@/components/projects/ProjectsPage";

import {
  Footer,
} from "@/components/layout/Footer";

import {
  getProjects,
} from "@/services/projects.service";

import {
  getCertifications,
} from "@/services/certifications.service";

export const instant = false;

export const metadata: Metadata = {
  title:
    "Proyectos | CIMAS Ingenieros",

  description:
    "Conoce los principales proyectos desarrollados por CIMAS & Ingenieros.",
};

interface ProjectsRouteProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function ProjectsRoute({
  searchParams,
}: ProjectsRouteProps) {
  const params =
    await searchParams;

  const currentPage =
    Math.max(
      1,
      Number(
        params.page ?? 1
      ) || 1
    );

  const [
    projectsResponse,
    certificationsResponse,
  ] = await Promise.all([
    getProjects(
      currentPage,
      10
    ),

    getCertifications(),
  ]);

  return (
    <>
      <ProjectsPage
        projects={
          projectsResponse.data.data
        }
        currentPage={
          projectsResponse.data.current_page
        }
        lastPage={
          projectsResponse.data.last_page
        }
        total={
          projectsResponse.data.total
        }
      />

      <Footer
        certifications={
          certificationsResponse.data.data
        }
      />
    </>
  );
}