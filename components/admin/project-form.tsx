"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Project } from "@/lib/db"
import { X } from "lucide-react"

interface ProjectFormProps {
  project?: Project
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    category: project?.category || "programming",
    tags: project?.tags || [],
    demo_link: project?.demo_link || "",
    github_link: project?.github_link || "",
    image_url: project?.image_url || "",
  })
  const [tag, setTag] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleAddTag = () => {
    if (tag.trim() && !formData.tags.includes(tag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag.trim()],
      }))
      setTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const url = project ? `/api/projects/${project.id}` : "/api/projects"

      const method = project ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        router.push("/admin/projects")
        router.refresh()
      } else {
        setError(data.message || "Failed to save project")
      }
    } catch (err) {
      setError("An error occurred while saving the project")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-black/40 border border-purple-500/20 backdrop-blur-sm">
      <CardContent className="pt-6 pb-32 overflow-y-auto max-h-[90vh]">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-md">{error}</div>}

          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter project title"
              required
              className="bg-black/50 border-purple-500/20 focus:border-purple-500/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter project description"
              required
              className="min-h-[100px] bg-black/50 border-purple-500/20 focus:border-purple-500/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="bg-black/50 border-purple-500/20 focus:border-purple-500/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={handleCategoryChange} required>
              <SelectTrigger className="bg-black/50 border-purple-500/20 focus:border-purple-500/50">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-black/80 border border-purple-500/20 backdrop-blur-sm">
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="networking">Networking</SelectItem>
                <SelectItem value="data">Data</SelectItem>
                <SelectItem value="programming">Programming</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Add a tag"
                className="bg-black/50 border-purple-500/20 focus:border-purple-500/50"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
              />
              <Button type="button" onClick={handleAddTag} className="bg-purple-600 hover:bg-purple-700">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 bg-purple-500/20 border border-purple-500/30 rounded-full px-3 py-1"
                >
                  <span className="text-sm">{t}</span>
                  <button type="button" onClick={() => handleRemoveTag(t)} className="text-gray-400 hover:text-white">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="demo_link">Demo Link</Label>
              <Input
                id="demo_link"
                name="demo_link"
                value={formData.demo_link}
                onChange={handleChange}
                placeholder="Enter demo link"
                className="bg-black/50 border-purple-500/20 focus:border-purple-500/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github_link">GitHub Link</Label>
              <Input
                id="github_link"
                name="github_link"
                value={formData.github_link}
                onChange={handleChange}
                placeholder="Enter GitHub link"
                className="bg-black/50 border-purple-500/20 focus:border-purple-500/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Detailed Content</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Enter detailed project content"
              className="min-h-[200px] bg-black/50 border-purple-500/20 focus:border-purple-500/50"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-purple-500/20 hover:bg-purple-500/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {loading ? "Saving..." : project ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
