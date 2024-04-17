import { useState } from 'react'
import NewProject from './components/NewProject'
import NoProjectSelected from './components/NoProjectSelected'
import ProjectsSidebar from './components/ProjectsSidebar'
import SelectedProject from './components/SelectedProject'

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  })

  const handleAddTask = text => {
    if (text.trim() === '') return
    const newTask = {
      text,
      projectId: projectState.selectedProjectId,
      id: Math.random()
    }

    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      }
    })
  }

  const handleDeleteTask = id => {
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: projectState.tasks.filter(task => task.id !== id)
      }
    })
  }

  const handleSelectedProject = id => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    })
  }

  const handleStartAddProject = () => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  const handleCancelProject = () => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    })
  }

  const handleAddProject = projectData => {
    const newProject = {
      ...projectData,
      id: Math.random()
    }

    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  const handleDeleteProject = () => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: projectState.projects.filter(
          project => project.id !== projectState.selectedProjectId
        )
      }
    })
  }

  // console.log(projectState);

  const selectedProject = projectState.projects.find(
    project => project.id === projectState.selectedProjectId
  )

  let content = (
    <SelectedProject
      project={selectedProject}
      onDeleteProject={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
  )

  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelProject} />
    )
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className='h-screen my-8 flex gap-8'>
      <ProjectsSidebar
        projectsData={projectState.projects}
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectedProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  )
}

export default App
