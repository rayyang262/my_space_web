// Each project has a meshName that must exactly match the object name
// you give the artwork plane in SketchUp's Outliner panel.
// Format: artwork_<id>  e.g. "artwork_project-01"
//
// Once you export studio.glb and drop it in /public/studio.glb,
// update meshName here to match what you named each panel in SketchUp.

export const projects = [
  {
    id: 'project-01',
    title: 'Badminton AI',
    year: '2026 – Present',
    imageSrc: `${import.meta.env.BASE_URL}projects/project-01.jpg`,
    meshName: 'artwork_project-01',
    link: 'https://github.com/rayyang262/Badminton_ai',
  },
  {
    id: 'project-02',
    title: 'Acer Internship',
    year: '2025',
    imageSrc: `${import.meta.env.BASE_URL}projects/project-02.jpg`,
    meshName: 'artwork_project-02',
  },
  {
    id: 'project-03',
    title: 'Project Three',
    year: '2023',
    imageSrc: `${import.meta.env.BASE_URL}projects/project-03.jpg`,
    meshName: 'artwork_project-03',
  },
  {
    id: 'project-04',
    title: 'Project Four',
    year: '2023',
    imageSrc: `${import.meta.env.BASE_URL}projects/project-04.jpg`,
    meshName: 'artwork_project-04',
  },
  {
    id: 'project-05',
    title: 'Project Five',
    year: '2023',
    imageSrc: `${import.meta.env.BASE_URL}projects/project-05.jpg`,
    meshName: 'artwork_project-05',
  },
  {
    id: 'project-06',
    title: 'Project Six',
    year: '2022',
    imageSrc: `${import.meta.env.BASE_URL}projects/project-06.jpg`,
    meshName: 'artwork_project-06',
  },
  {
    id: 'project-07',
    title: 'Project Seven',
    year: '2022',
    imageSrc: `${import.meta.env.BASE_URL}projects/project-07.jpg`,
    meshName: 'artwork_project-07',
  },
  {
    id: 'project-08',
    title: 'Project Eight',
    year: '2022',
    imageSrc: `${import.meta.env.BASE_URL}projects/project-08.jpg`,
    meshName: 'artwork_project-08',
  },
]
