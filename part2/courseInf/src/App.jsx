const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course => (
        <div key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  )
}

const Header = ({ name }) => {
  return <h2>{name}</h2>;
}

const Total = ({ parts }) => {
  const totalTem = parts.reduce((acc, cur) => {
    return (acc + cur.exercises)
  }, 0)
  return (<p><b>Total of {totalTem} exercises</b></p>)
}
  

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(data => (
        <Part key={data.id} name={data.name} exercises={data.exercises} />))
      }  
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course courses={courses} />
    </div>
  )
}
  

export default App