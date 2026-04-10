import {useEffect, useState} from "react";
import type {Puzzle} from "../../types/Puzzle.tsx";
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
      <section className="py-2">
        <h1 className="h2 mb-4">Puzzles</h1>

        {puzzles.length > 0 && (
            <div className="list-group">
              {puzzles.map(puzzle => (
                <div key={puzzle.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{puzzle.name}</span>
                  <Link to={`/details/${puzzle.id}`} className="btn btn-outline-primary btn-sm">
                    View details
                  </Link>
                </div>
              ))}
            </div>
        )}

        {puzzles.length === 0 && <p className="text-muted">Loading puzzles...</p>}
      </section>
  )
}