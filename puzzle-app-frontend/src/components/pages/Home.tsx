import {useEffect, useState} from "react";
import type {Puzzle} from "../../types/Puzzle.tsx";
import {Link} from "react-router";

const PLACEHOLDER_IMAGE = "/placeholder-image.svg";

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
              {puzzles.map(puzzle => {
                const imageSrc = puzzle.image?.trim() ? puzzle.image : PLACEHOLDER_IMAGE;

                return (
                  <div key={puzzle.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={imageSrc}
                        alt={puzzle.name}
                        className="rounded"
                        style={{ width: 48, height: 48, objectFit: "cover", flexShrink: 0 }}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = PLACEHOLDER_IMAGE;
                        }}
                      />
                      <span>{puzzle.name}</span>
                    </div>
                    <Link to={`/details/${puzzle.id}`} className="btn btn-outline-primary btn-sm">
                      View details
                    </Link>
                  </div>
                )
              })}
            </div>
        )}

        {puzzles.length === 0 && <p className="text-muted">Loading puzzles...</p>}
      </section>
  )
}