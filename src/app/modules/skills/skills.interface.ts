export interface ISkill {
  userID: string;
  skillName: string;
  category:
    | 'frontend'
    | 'backend'
    | 'tool'
    | 'plan-to-learn'
    | 'extra'
    | 'language';
  level: 'beginner' | 'medium' | 'advanced';
}
