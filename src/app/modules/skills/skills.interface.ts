export interface Skill {
  id: string;
  skillName: string;
  category: 'frontend' | 'backend' | 'tool' | 'plan-to-learn' | 'extra';
  level: 'beginner' | 'medium' | 'advanced';
}
