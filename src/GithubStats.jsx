// import React, { useEffect, useState } from 'react';

// function GitHubStats() {
//   const [stats, setStats] = useState(null);
//   const username = 'awindsr';
// const githubToken = import.meta.env.VITE_GITHUB_TOKEN;

//   useEffect(() => {
//     const fetchGitHubStats = async () => {
//       try {
//         // Fetch GitHub stats using fetch or axios
//         const response = await fetch(`https://api.github.com/users/${username}`, {
//           headers: {
//             Authorization: `token ${githubToken}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch GitHub stats');
//         }
//         const data = await response.json();
//         setStats({
//           totalCommits: data.public_repos,
//           totalContributions: data.public_gists,
//           totalStars: data.followers,
//         });
//       } catch (error) {
//         console.error('Error fetching GitHub stats:', error);
//       }
//     };

//     fetchGitHubStats();
//   }, [username, githubToken]);

//   if (!stats) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>GitHub Stats for {username}</h2>
//       <p>Total Commits: {stats.totalCommits}</p>
//       <p>Total Contributions: {stats.totalContributions}</p>
//       <p>Total Stars Earned: {stats.totalStars}</p>
//     </div>
//   );
// }

// export default GitHubStats;
