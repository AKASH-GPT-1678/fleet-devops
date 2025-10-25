"use client";
import React, { useState } from 'react';
import { CheckCircle, Circle, ChevronDown, ChevronRight } from 'lucide-react';

const DevOpsRoadmap = () => {
    const [expandedPhases, setExpandedPhases] = useState<any>({});
    const [completedSteps, setCompletedSteps] = useState<{ [key: string]: boolean }>({});

    const togglePhase = (phaseId: any) => {
        //@ts-ignore
        setExpandedPhases(prev => ({
            ...prev,
            [phaseId]: !prev[phaseId]
        }));
    };

    const toggleStep = (stepId: any) => {
        setCompletedSteps(prev => ({
            ...prev,
            //@ts-ignore
            [stepId]: !prev[stepId]
        }));
    };

    const roadmap = [
        {
            id: 'phase1',
            phase: 'Phase 1: Foundation & Containerization',
            duration: 'Week 1-2',
            steps: [
                {
                    id: 'p1s1',
                    title: '1. Repository Structure Setup',
                    details: [
                        'Create monorepo or separate repos for frontend, backend, and infrastructure',
                        'Structure: /frontend, /backend, /databases, /infrastructure, /k8s, /helm-charts',
                        'Setup .gitignore for each component',
                        'Create README.md with architecture diagram'
                    ]
                },
                {
                    id: 'p1s2',
                    title: '2. Dockerization',
                    details: [
                        'Frontend Dockerfile (multi-stage build with nginx)',
                        'Backend Dockerfile (optimize with layers)',
                        'Create docker-compose.yml for local development',
                        'Include all 3 databases (PostgreSQL, MongoDB, Redis as example)',
                        'Add Kafka container with Zookeeper',
                        'Create .dockerignore files',
                        'Build and test locally'
                    ]
                },
                {
                    id: 'p1s3',
                    title: '3. Container Registry Setup',
                    details: [
                        'Setup Docker Hub / AWS ECR / Google GCR',
                        'Create repositories for each service',
                        'Configure authentication',
                        'Implement image tagging strategy (semantic versioning)'
                    ]
                }
            ]
        },
        {
            id: 'phase2',
            phase: 'Phase 2: CI/CD Pipeline - GitHub Actions',
            duration: 'Week 2-3',
            steps: [
                {
                    id: 'p2s1',
                    title: '4. GitHub Actions Workflows',
                    details: [
                        'Create .github/workflows/frontend-ci.yml',
                        'Create .github/workflows/backend-ci.yml',
                        'Implement build, test, lint stages',
                        'Add security scanning (Trivy, Snyk)',
                        'SonarQube integration for code quality',
                        'Unit test execution with coverage reports',
                        'Integration tests'
                    ]
                },
                {
                    id: 'p2s2',
                    title: '5. GitHub Actions CD Pipeline',
                    details: [
                        'Build Docker images on merge to main',
                        'Push images to container registry',
                        'Tag images with commit SHA and version',
                        'Trigger deployment workflows',
                        'Create separate workflows for dev/staging/prod',
                        'Implement manual approval for production'
                    ]
                },
                {
                    id: 'p2s3',
                    title: '6. GitHub Actions - Database Migrations',
                    details: [
                        'Setup Flyway/Liquibase for DB migrations',
                        'Create migration workflow',
                        'Test migrations in CI',
                        'Rollback strategies'
                    ]
                }
            ]
        },
        {
            id: 'phase3',
            phase: 'Phase 3: Jenkins Integration',
            duration: 'Week 3-4',
            steps: [
                {
                    id: 'p3s1',
                    title: '7. Jenkins Setup',
                    details: [
                        'Deploy Jenkins on Kubernetes or VM',
                        'Install required plugins (Docker, K8s, Git, Pipeline)',
                        'Configure Jenkins credentials',
                        'Setup Jenkins agents/slaves'
                    ]
                },
                {
                    id: 'p3s2',
                    title: '8. Jenkins Pipeline Creation',
                    details: [
                        'Create Jenkinsfile for each service',
                        'Stages: Checkout → Build → Test → Security Scan → Docker Build → Push',
                        'Parallel execution for frontend and backend',
                        'Integration with SonarQube',
                        'Artifact archiving',
                        'Slack/Email notifications'
                    ]
                },
                {
                    id: 'p3s3',
                    title: '9. Jenkins Deployment Pipeline',
                    details: [
                        'Deploy to dev environment automatically',
                        'Staging deployment with approval',
                        'Production deployment with manual trigger',
                        'Blue-Green deployment strategy',
                        'Rollback mechanisms'
                    ]
                }
            ]
        },
        {
            id: 'phase4',
            phase: 'Phase 4: Kubernetes Cluster Setup',
            duration: 'Week 4-5',
            steps: [
                {
                    id: 'p4s1',
                    title: '10. Kubernetes Cluster Provisioning',
                    details: [
                        'Setup K8s cluster (EKS/GKE/AKS or local Minikube)',
                        'Configure kubectl access',
                        'Create namespaces: dev, staging, production',
                        'Setup RBAC policies',
                        'Configure network policies'
                    ]
                },
                {
                    id: 'p4s2',
                    title: '11. Kubernetes Manifests',
                    details: [
                        'Create Deployments for frontend, backend',
                        'Create StatefulSets for databases',
                        'Configure Services (ClusterIP, LoadBalancer)',
                        'Setup ConfigMaps for configuration',
                        'Create Secrets for sensitive data',
                        'Define PersistentVolumes and PersistentVolumeClaims',
                        'Setup Ingress resources',
                        'Configure HPA (Horizontal Pod Autoscaler)'
                    ]
                },
                {
                    id: 'p4s3',
                    title: '12. Kafka on Kubernetes',
                    details: [
                        'Deploy Kafka using Strimzi operator or Helm',
                        'Configure Kafka topics',
                        'Setup Zookeeper ensemble',
                        'Create Kafka Connect if needed'
                    ]
                }
            ]
        },
        {
            id: 'phase5',
            phase: 'Phase 5: Helm Charts',
            duration: 'Week 5-6',
            steps: [
                {
                    id: 'p5s1',
                    title: '13. Helm Chart Development',
                    details: [
                        'Create Helm chart for frontend',
                        'Create Helm chart for backend',
                        'Create Helm chart for databases',
                        'Parameterize with values.yaml',
                        'Create values-dev.yaml, values-staging.yaml, values-prod.yaml',
                        'Use Helm templates for ConfigMaps and Secrets',
                        'Add chart dependencies'
                    ]
                },
                {
                    id: 'p5s2',
                    title: '14. Helm Repository',
                    details: [
                        'Setup Helm repository (ChartMuseum or Harbor)',
                        'Package and publish charts',
                        'Version charts semantically',
                        'Create umbrella chart for complete application'
                    ]
                }
            ]
        },
        {
            id: 'phase6',
            phase: 'Phase 6: ArgoCD GitOps',
            duration: 'Week 6-7',
            steps: [
                {
                    id: 'p6s1',
                    title: '15. ArgoCD Installation',
                    details: [
                        'Install ArgoCD on Kubernetes',
                        'Access ArgoCD UI',
                        'Configure ArgoCD CLI',
                        'Setup SSO (optional)'
                    ]
                },
                {
                    id: 'p6s2',
                    title: '16. ArgoCD Applications',
                    details: [
                        'Create ArgoCD Application manifests',
                        'Connect to Git repository',
                        'Configure sync policies (auto/manual)',
                        'Setup sync waves for ordered deployment',
                        'Configure health checks',
                        'Enable auto-sync with pruning',
                        'Setup notifications (Slack, Email)'
                    ]
                },
                {
                    id: 'p6s3',
                    title: '17. GitOps Workflow',
                    details: [
                        'CI updates image tags in Git repo',
                        'ArgoCD detects changes and syncs',
                        'Implement image updater',
                        'Setup promotion workflow (dev → staging → prod)',
                        'Create rollback procedures'
                    ]
                }
            ]
        },
        {
            id: 'phase7',
            phase: 'Phase 7: Monitoring Stack',
            duration: 'Week 7-8',
            steps: [
                {
                    id: 'p7s1',
                    title: '18. Prometheus Setup',
                    details: [
                        'Install Prometheus using kube-prometheus-stack',
                        'Configure ServiceMonitors for all services',
                        'Setup PodMonitors',
                        'Configure alerting rules',
                        'Setup Prometheus federation if multi-cluster'
                    ]
                },
                {
                    id: 'p7s2',
                    title: '19. Grafana Dashboards',
                    details: [
                        'Install Grafana (included in kube-prometheus-stack)',
                        'Import pre-built dashboards',
                        'Create custom dashboards for frontend metrics',
                        'Create custom dashboards for backend metrics',
                        'Database performance dashboards',
                        'Kafka monitoring dashboard',
                        'Kubernetes cluster health dashboard',
                        'Setup alerts and notification channels'
                    ]
                },
                {
                    id: 'p7s3',
                    title: '20. Application Performance Monitoring',
                    details: [
                        'Integrate APM tool (New Relic/DataDog/Dynatrace)',
                        'Or setup Jaeger for distributed tracing',
                        'Instrument application code',
                        'Track transaction traces',
                        'Monitor database query performance'
                    ]
                }
            ]
        },
        {
            id: 'phase8',
            phase: 'Phase 8: Logging Infrastructure',
            duration: 'Week 8-9',
            steps: [
                {
                    id: 'p8s1',
                    title: '21. EFK/ELK Stack Setup',
                    details: [
                        'Install Elasticsearch cluster',
                        'Deploy Fluentd/Fluent-bit as DaemonSet',
                        'Or Logstash for log processing',
                        'Install Kibana for visualization',
                        'Configure log retention policies',
                        'Setup index patterns'
                    ]
                },
                {
                    id: 'p8s2',
                    title: '22. Centralized Logging',
                    details: [
                        'Configure log forwarding from all pods',
                        'Structure logs in JSON format',
                        'Add correlation IDs',
                        'Create Kibana dashboards',
                        'Setup log-based alerts',
                        'Implement log rotation',
                        'Configure backup strategy'
                    ]
                },
                {
                    id: 'p8s3',
                    title: '23. Alternative: Loki Stack',
                    details: [
                        'Install Loki and Promtail',
                        'Configure Promtail to scrape logs',
                        'Integrate with Grafana',
                        'Create log queries and alerts'
                    ]
                }
            ]
        },
        {
            id: 'phase9',
            phase: 'Phase 9: Security & Compliance',
            duration: 'Week 9-10',
            steps: [
                {
                    id: 'p9s1',
                    title: '24. Secret Management',
                    details: [
                        'Setup HashiCorp Vault or AWS Secrets Manager',
                        'Integrate Vault with Kubernetes',
                        'Use External Secrets Operator',
                        'Rotate secrets regularly',
                        'Encrypt secrets at rest'
                    ]
                },
                {
                    id: 'p9s2',
                    title: '25. Security Scanning',
                    details: [
                        'Integrate Trivy for container scanning',
                        'Setup Snyk for dependency scanning',
                        'Implement SAST with SonarQube',
                        'Add DAST scanning',
                        'Configure Falco for runtime security',
                        'Setup OPA/Gatekeeper for policy enforcement'
                    ]
                },
                {
                    id: 'p9s3',
                    title: '26. Network Security',
                    details: [
                        'Implement Network Policies',
                        'Setup Service Mesh (Istio/Linkerd)',
                        'Configure mTLS between services',
                        'Setup API Gateway',
                        'Implement rate limiting',
                        'Configure WAF rules'
                    ]
                }
            ]
        },
        {
            id: 'phase10',
            phase: 'Phase 10: Testing Automation',
            duration: 'Week 10-11',
            steps: [
                {
                    id: 'p10s1',
                    title: '27. Test Pyramid Implementation',
                    details: [
                        'Unit tests (Jest, JUnit, pytest)',
                        'Integration tests',
                        'API tests (Postman, RestAssured)',
                        'Contract testing (Pact)',
                        'E2E tests (Selenium, Cypress, Playwright)',
                        'Performance tests (JMeter, k6)',
                        'Chaos engineering tests (Chaos Mesh)'
                    ]
                },
                {
                    id: 'p10s2',
                    title: '28. Test Automation in Pipeline',
                    details: [
                        'Run unit tests in CI',
                        'Run integration tests after deployment to dev',
                        'Smoke tests in staging',
                        'Performance tests before production',
                        'Generate test reports',
                        'Code coverage thresholds',
                        'Quality gates'
                    ]
                }
            ]
        },
        {
            id: 'phase11',
            phase: 'Phase 11: Database DevOps',
            duration: 'Week 11-12',
            steps: [
                {
                    id: 'p11s1',
                    title: '29. Database CI/CD',
                    details: [
                        'Schema version control',
                        'Automated migrations with Flyway/Liquibase',
                        'Database testing in CI',
                        'Backup automation',
                        'Point-in-time recovery setup',
                        'Database monitoring and alerts'
                    ]
                },
                {
                    id: 'p11s2',
                    title: '30. Database High Availability',
                    details: [
                        'Setup database replication',
                        'Configure read replicas',
                        'Implement automated failover',
                        'Setup backup and restore procedures',
                        'Disaster recovery plan'
                    ]
                }
            ]
        },
        {
            id: 'phase12',
            phase: 'Phase 12: Advanced Features',
            duration: 'Week 12-14',
            steps: [
                {
                    id: 'p12s1',
                    title: '31. Infrastructure as Code',
                    details: [
                        'Terraform for cloud infrastructure',
                        'Manage K8s clusters with Terraform',
                        'Provision databases, networking, IAM',
                        'Setup Terraform state management',
                        'Implement Terraform modules',
                        'Setup Terraform Cloud/Enterprise'
                    ]
                },
                {
                    id: 'p12s2',
                    title: '32. Service Mesh Implementation',
                    details: [
                        'Install Istio or Linkerd',
                        'Configure traffic management',
                        'Implement canary deployments',
                        'Setup circuit breakers',
                        'Configure retry policies',
                        'Implement A/B testing'
                    ]
                },
                {
                    id: 'p12s3',
                    title: '33. Cost Optimization',
                    details: [
                        'Setup Kubecost for K8s cost monitoring',
                        'Implement resource quotas',
                        'Configure cluster autoscaling',
                        'Right-size pods and nodes',
                        'Setup spot/preemptible instances',
                        'Implement cost alerts'
                    ]
                },
                {
                    id: 'p12s4',
                    title: '34. Disaster Recovery',
                    details: [
                        'Setup Velero for K8s backup',
                        'Backup all persistent data',
                        'Create runbooks',
                        'Test disaster recovery procedures',
                        'Setup multi-region deployment',
                        'Implement chaos engineering'
                    ]
                }
            ]
        },
        {
            id: 'phase13',
            phase: 'Phase 13: Documentation & Training',
            duration: 'Week 14-15',
            steps: [
                {
                    id: 'p13s1',
                    title: '35. Documentation',
                    details: [
                        'Architecture documentation',
                        'Deployment runbooks',
                        'Troubleshooting guides',
                        'API documentation',
                        'Infrastructure diagrams',
                        'On-call playbooks',
                        'Incident response procedures'
                    ]
                },
                {
                    id: 'p13s2',
                    title: '36. Observability Dashboard',
                    details: [
                        'Create unified observability dashboard',
                        'Service health overview',
                        'SLA/SLO tracking',
                        'Incident timeline',
                        'Cost dashboard',
                        'Security compliance dashboard'
                    ]
                }
            ]
        }
    ];

    const getPhaseProgress = (phase: any) => {
        const steps = phase.steps;
        // @ts-ignore
        const completed = steps.filter(step => completedSteps[step.id]).length;
        return Math.round((completed / steps.length) * 100);
    };

    const getTotalProgress = () => {
        const totalSteps = roadmap.reduce((acc, phase) => acc + phase.steps.length, 0);
        const completedCount = Object.values(completedSteps).filter(Boolean).length;
        return Math.round((completedCount / totalSteps) * 100);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 border border-white/20">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Complete DevOps Roadmap
                    </h1>
                    <p className="text-blue-200 mb-4">
                        End-to-end DevOps implementation for: 1 Frontend + 1 Backend + 3 Databases + Kafka
                    </p>
                    <div className="bg-white/20 rounded-full h-4 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-full transition-all duration-500"
                            style={{ width: `${getTotalProgress()}%` }}
                        />
                    </div>
                    <p className="text-white mt-2 text-sm">Overall Progress: {getTotalProgress()}%</p>
                </div>

                <div className="space-y-4">
                    {roadmap.map((phase) => {
                        const isExpanded = expandedPhases[phase.id];
                        const progress = getPhaseProgress(phase);

                        return (
                            <div
                                key={phase.id}
                                className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden"
                            >
                                <div
                                    className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
                                    onClick={() => togglePhase(phase.id)}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3 flex-1">
                                            {isExpanded ? (
                                                <ChevronDown className="text-blue-400 mt-1 flex-shrink-0" size={24} />
                                            ) : (
                                                <ChevronRight className="text-blue-400 mt-1 flex-shrink-0" size={24} />
                                            )}
                                            <div className="flex-1">
                                                <h2 className="text-2xl font-bold text-white mb-2">
                                                    {phase.phase}
                                                </h2>
                                                <span className="text-blue-300 text-sm">
                                                    {phase.duration}
                                                </span>
                                                <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
                                                    <div
                                                        className="bg-green-400 h-full transition-all duration-500"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                                <p className="text-white/80 text-xs mt-1">{progress}% Complete</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="px-6 pb-6 space-y-4">
                                        {phase.steps.map((step) => (
                                            <div
                                                key={step.id}
                                                className="bg-white/5 rounded-lg p-4 border border-white/10"
                                            >
                                                <div
                                                    className="flex items-start gap-3 cursor-pointer"
                                                    onClick={() => toggleStep(step.id)}
                                                >

                                                    {completedSteps[step.id] ? (
                                                        <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={24} />
                                                    ) : (
                                                        <Circle className="text-gray-400 flex-shrink-0 mt-1" size={24} />
                                                    )}
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-white mb-2">
                                                            {step.title}
                                                        </h3>
                                                        <ul className="space-y-1">
                                                            {step.details.map((detail, idx) => (
                                                                <li key={idx} className="text-blue-200 text-sm flex items-start gap-2">
                                                                    <span className="text-blue-400 flex-shrink-0">•</span>
                                                                    <span>{detail}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-3">Key DevOps Tools Used</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        {[
                            'Docker', 'Kubernetes', 'Helm', 'ArgoCD',
                            'GitHub Actions', 'Jenkins', 'Terraform', 'Prometheus',
                            'Grafana', 'ELK/EFK Stack', 'Kafka', 'Vault',
                            'SonarQube', 'Trivy', 'Istio/Linkerd', 'Velero'
                        ].map((tool) => (
                            <div key={tool} className="bg-white/10 rounded-lg p-2 text-center text-white border border-white/10">
                                {tool}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 bg-yellow-500/20 backdrop-blur-lg rounded-xl p-6 border border-yellow-500/30">
                    <h3 className="text-lg font-bold text-yellow-200 mb-2">💡 Pro Tips</h3>
                    <ul className="space-y-2 text-yellow-100 text-sm">
                        <li>• Start with Phase 1-2 to get quick wins with containerization and basic CI</li>
                        <li>• Don't skip testing automation - implement early in the pipeline</li>
                        <li>• Document as you go, don't leave it for the end</li>
                        <li>• Use infrastructure as code from day one</li>
                        <li>• Implement monitoring before going to production</li>
                        <li>• Click on circles to mark steps as complete and track your progress</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DevOpsRoadmap;