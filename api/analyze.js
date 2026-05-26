export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { text } = req.body;
    
    try {
        const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.ARK_API_KEY}`
            },
            body: JSON.stringify({
                model: 'doubao-seed-2-0-pro-260215',
                messages: [
                    {
                        role: 'system',
                        content: '你是一个雅思口语考试专家。用户会输入中文答案，请你：1）指出表达逻辑问题，2）提供英文表达建议，3）给出评分（1-9分）。用中文回答。'
                    },
                    {
                        role: 'user',
                        content: text
                    }
                ]
            })
        });

        const data = await response.json();
        const result = data.choices[0].message.content;
        res.status(200).json({ result });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
