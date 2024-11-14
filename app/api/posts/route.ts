import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("searchQuery") || "";

  try {
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { name: { contains: searchQuery } },
          { prompt: { contains: searchQuery } },
        ],
      },
      orderBy: [
        { likes: 'desc' },
        { createdAt: 'desc' },
      ],
      take: 30,
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}

// const response = await fetch('/api/posts');
// const response = await fetch('/api/posts?searchQuery=your-search-term');

/*
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/posts?searchQuery=${searchQuery}`);
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, [searchQuery]);
*/
