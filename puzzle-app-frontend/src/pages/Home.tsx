import {useEffect, useState} from "react";
import type {Puzzle} from "../types/Puzzle";
import {Link} from "react-router";

export default function Home() {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:8080/puzzles/');
      const puzzles = await res.json();
      setPuzzles(puzzles)
    }

    fetchData()
  }, [])

  return (
      <>
        <h1>Home</h1>

        {puzzles.length > 0 && (
            puzzles.map(puzzle => (
                <div key={puzzle.id} className="pb-3">
                  <Link to={`/details/${puzzle.id}`}>
                    {puzzle.name}
                  </Link>
                </div>
            ))
        )}
      </>
  )
}